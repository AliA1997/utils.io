// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  VerifyCodeDbData,
  getVerifyCodeDataFromDb,
  initializeSupabaseClient,
} from "../../../utils";

type ProfileCheckResponse = {
  success: boolean;
  profile?: any;
  code?: VerifyCodeDbData;
  error_message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileCheckResponse>
) {
  const { email } = req.body;
  const supabase = initializeSupabaseClient();
  const { data: userSubscription, error } = await supabase
    .from("user_subscriptions")
    .select()
    .eq("username", email)
    .single();

  const verifyCodeData = await getVerifyCodeDataFromDb(
    supabase,
    userSubscription?.id
  );
  if (!userSubscription) {
    return res.status(200).json({
      success: false,
      error_message: "No subscription found for this user",
    });
  }
  if (!userSubscription?.activated) {
    return res.status(200).json({
      success: false,
      error_message: "User not activated",
      profile: userSubscription,
      code: verifyCodeData as VerifyCodeDbData,
    });
  }
  if (!userSubscription?.trial_start) {
    return res.status(200).json({
      success: false,
      error_message: "Must select a plan",
      profile: userSubscription,
      code: verifyCodeData as VerifyCodeDbData,
    });
  }
  if (userSubscription?.trial_finished || (userSubscription?.trial_finished && !userSubscription?.month_paid)) {
    return res.status(200).json({
      success: false,
      error_message: "Need to pay or start trial",
      profile: userSubscription,
    });
  }

  return res.status(200).json({ success: true, profile: userSubscription });
}
