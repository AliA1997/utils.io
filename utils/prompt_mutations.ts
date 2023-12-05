import { SupabaseClient } from "@supabase/supabase-js";
import axios from "axios";
import { Db } from "mongodb";
import { encode } from "gpt-tokenizer";
import { Client, ResultsResponse } from "@services/server-client";
import { Dispatch, SetStateAction } from "react";
import polling from "./polling";

export enum GptStatuses {
  Pending = 0,
  Successful = 1,
  NotReceived = 2,
  Error = 3
};

export async function insertPromptResult(
  db: Db,
  text: string,
  product: string
) {
  try {
    return await db.collection("prompts").insertOne({
      text,
      product,
      recommended: true,
    });
  } catch (error) {
    console.log("error saving prompt result:", error);
  }
}

export interface IUpdateUserPromptInfo {
  prompt: string,
  username: string,
  serviceUsed: string,
  planName: string
}
const getRequestsKey = (planName: string) => {
  if(planName === 'basic') return "basic_requests_left";
  if(planName === 'web3') return "web3_requests_left";
  return 'chatbot_requests_left';
}
export async function updateUserPromptInfo(
  supabase: SupabaseClient,
  args: IUpdateUserPromptInfo
) {
  try {
  
    // Extract tokenized text from the response
    const tokenizedText = encode(args.prompt);
    console.log('tokenizedText:', tokenizedText.length);
    const { data: userSubscriptionData } = await supabase
      .from("user_subscriptions")
      .select()
      .eq("username", args.username)
      .single();
    const userSubscription = userSubscriptionData as any;
  
    const requestsKey = getRequestsKey(args.planName);
    const newRequestKeyValue = userSubscription[requestsKey] - 1;
    if(newRequestKeyValue < 0)  throw new Error("No requests left");
    await supabase
    .from("user_subscriptions")
    .update({
      [requestsKey]: newRequestKeyValue,
      tokens_used: userSubscription.tokens_used + tokenizedText.length,
      service_last_used: args.serviceUsed,
    })
    .eq("id", userSubscription['id']);
  
    console.log('prompt info updated');
  } catch(error) {
    console.log("ERROR:", error);
    throw error;
  }
}
