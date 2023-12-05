// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  Configuration,
  CreateChatCompletionResponseChoicesInner,
  OpenAIApi,
} from "openai";
import { initializeOpenAiClient, initializeSupabaseClient } from "../../../utils";

async function createChat(
  messages: CreateChatCompletionResponseChoicesInner[],
  userSubscriptionId: string
) {
  const supabase = initializeSupabaseClient();
  const { data, error } = await supabase
    .from("chatbot_messages")
    .insert({
      messages: JSON.stringify(messages),
      user_subscription_id: userSubscriptionId,
      created_at: new Date(),
    })
    .select()
    .single();
  return data;
}
async function updateChat(
  messages: CreateChatCompletionResponseChoicesInner[],
  userSubscriptionId: string,
  chatbotMessageId: string
) {
  const supabase = initializeSupabaseClient();
  const { data, error } = await supabase
    .from("chatbot_messages")
    .update({
      messages: JSON.stringify(messages),
    })
    .eq("id", chatbotMessageId)
    .select()
    .single();
  return data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // const openai = initializeOpenAiClient();
  // const { messages, userSubscriptionId, chatId } = req.body;
  // const { userMessage, previousMessages } = req.body;

  // try {
    // let messages = [];
    // if(!previousMessages.length) {
    //     messages = [
    //         { "role": "system", "content": "You are a fun ai assistant." },
    //         { "role": "user", "content": userMessage },
    //     ];
    // } else {
    //     messages = [...previousMessages, { "role": "user", "content": userMessage }];
    // }
    //AI has no reference to previous messages, must pass previous messages.
  //   const response = await openai.createChatCompletion({
  //     model: "gpt-3.5-turbo",
  //     messages,
  //   });
  //   if (
  //     response.data &&
  //     response.data.choices &&
  //     response.data.choices.length > 0
  //   ) {
  //     if (chatId)
  //       await updateChat(response.data.choices, userSubscriptionId, chatId);
  //     else await createChat(response.data.choices, userSubscriptionId);
  //     return res.status(200).json({ chatMessages: response.data.choices });
  //   }
  //   return res.status(404).json({ message: "No response from OpenAI" });
  // } catch (error: any) {
  //   return res.status(404).json({ message: error.message });
  // }

  //Inactive migrated to c# server, eventually will be removed.
  return res.status(200).json({ chatMessages: "Inactive endpoint."});

}
