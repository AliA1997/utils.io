// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  initializeSupabaseClient,
} from "../../../utils";

type ChatbotHistoryItem = {
    id: string;
    user_subscription_id: number;
    created_at: Date;
    messages: string;
};

type ChatbotHistoryResponse = {
    success: boolean;
    history?: ChatbotHistoryItem[];
    errorMessage?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatbotHistoryResponse>
) {
  const { userSubscriptionId, code } = req.body;
  const supabase = initializeSupabaseClient();
  try {
    const { data: chatbotHistory } = await supabase.from('chatbot_history').select().eq('user_subscription_id', userSubscriptionId);
    res.status(200).json({ success: true, history: chatbotHistory as ChatbotHistoryItem[]});
  } catch(error: any) {
    return res.status(400).json({ success: false, errorMessage: error.message });
  }
}
