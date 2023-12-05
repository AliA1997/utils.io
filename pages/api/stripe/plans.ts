// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  getPriceId,
  getProductId,
  initializeSupabaseClient,
} from "../../../utils";

type SubscriptionPlanResponse = {
  success: boolean;
  id?: number;
  subscription_name?: string;
  priceId?: string;
  productId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubscriptionPlanResponse>
) {
  const planName = req.query["planName"] as string;
  const userSubscriptionId = req.query["userSubscriptionId"];

  const supabase = initializeSupabaseClient();
  const { data: plan } = await supabase
    .from("subscriptions")
    .select()
    .eq("subscription_name", planName)
    .single();
  const { data: userSubscription } = await supabase
    .from("user_subscriptions")
    .select()
    .eq("id", parseInt(userSubscriptionId as string))
    .single();

  const priceId = getPriceId(userSubscription?.country_of_residence, planName);
  const productId = getProductId(planName);
  
  if (plan) {
    return res
      .status(200)
      .json({ success: true, id: plan.id, productId, priceId });
  } else {
    return res.status(400).json({ success: false });
  }
}
