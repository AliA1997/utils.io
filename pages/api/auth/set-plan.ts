// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  convertVerifiedSubToReduxData,
  initializeSupabaseClient,
} from "../../../utils";
import { CurrentUtilsIOSubscriptionData } from "@redux/reducers/authSlice";

type SetPlanResponse = {
  success: boolean;
  subscriptionUser?: CurrentUtilsIOSubscriptionData;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SetPlanResponse>
) {
  const { planName, userSubscriptionId } = req.body;
  console.log('planName:', planName, 'userSubscriptionId:', userSubscriptionId);
  const supabase = initializeSupabaseClient();
  const { data: subscriptionData } = await supabase
    .from("subscriptions")
    .select()
    .eq("subscription_name", planName)
    .single();
  console.log("subscriptiondata:", subscriptionData);
  if (!subscriptionData) {
    return res.status(400).json({ success: false });
  } else {
    await supabase
      .from("user_subscriptions")
      .update({ subscription: (subscriptionData as any)["id"] })
      .eq("id", userSubscriptionId);

    const { data: subscriptionUser } = await supabase
      .from("user_subscriptions")
      .select()
      .eq("id", userSubscriptionId)
      .single();

    const subscriptionUserToReturn = convertVerifiedSubToReduxData(
      subscriptionUser,
      planName
    );

    return res
      .status(200)
      .json({ success: true, subscriptionUser: subscriptionUserToReturn });
  }
}
