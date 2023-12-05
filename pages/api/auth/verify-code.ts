// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  convertSubAndCodeToReduxData,
  getVerifyCodeDataFromDb,
  initializeSupabaseClient,
} from "../../../utils";
import { CurrentUtilsIOSubscriptionData, CurrentUtilsIOVerifyCodeData } from "@redux/reducers/authSlice";

type VerifyCodeResponse = {
  success: boolean;
  verifyCode?: CurrentUtilsIOVerifyCodeData;
  subscriptionUser?: CurrentUtilsIOSubscriptionData;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifyCodeResponse>
) {
  const { userSubscriptionId, code } = req.body;
  const supabase = initializeSupabaseClient();
  const verifyCodeData = await getVerifyCodeDataFromDb(
    supabase,
    userSubscriptionId
  );

  if (!verifyCodeData) {
    return res.status(400).json({ success: false });
  } else {
    if (verifyCodeData.code === code) {
      await supabase
        .from("verification_code")
        .update({ used: true })
        .eq("id", verifyCodeData.id);

      await supabase
        .from("user_subscriptions")
        .update({ activated: true })
        .eq("id", userSubscriptionId);
      
      const { data: subscriptionUser } = await supabase.from('user_subscriptions').select().eq('id', userSubscriptionId).single();
      const [subscriptionUserToReturn, verifyCodeDataToReturn] = convertSubAndCodeToReduxData(subscriptionUser, verifyCodeData);

      return res.status(200).json({ success: true, verifyCode: verifyCodeDataToReturn, subscriptionUser: subscriptionUserToReturn });
    } else {
      return res.status(400).json({ success: false });
    }
  }
}
