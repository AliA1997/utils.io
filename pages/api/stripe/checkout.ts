import { NextApiRequest, NextApiResponse } from "next";

//Domain of application
import Stripe from "stripe";
import { initializeSupabaseClient } from "../../../utils";
const DOMAIN = "http://localhost:3000";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15', // Replace with the desired API version
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { priceId, productId, subId, email } = req.body;
  try {
    const supabase = initializeSupabaseClient();
    const { data:sub } = await supabase.from('subscriptions').select().eq('id', subId).single();
    const findCustomerParams: Stripe.CustomerListParams = {
      email: email,
    };
    const customerData = await stripe.customers.list(findCustomerParams);
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: { email, subscription: sub?.subscription_name },
      //Success url is the url your are navigated to when you properly purchase subscription
      success_url: `${DOMAIN}?subscribed=true`,
      subscription_data: {
        trial_period_days: 7,
        metadata: { email, subscription: sub?.subscription_name },
      },
      //Cancel Url is the url your are navigated to  when you cancel subscription
      cancel_url: `${DOMAIN}/`,
      automatic_tax: { enabled: false },
    };
    if(customerData.data.length) {
      const customerId = customerData.data[0].id;
      await supabase.from('user_subscriptions').update({ stripe_customer_id: customerId }).eq('username', email);
      sessionParams.customer = customerId;
    } else {
      sessionParams.customer_email = email;
    }
    const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create(sessionParams);
    return res.status(200).json({ session });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}
