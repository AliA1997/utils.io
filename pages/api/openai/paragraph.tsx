// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  getPrompt,
  initializeOpenAiClient,
  initializeSupabaseClient,
  isOpenAiResponseValid,
} from "../../../utils";
import { PromptProducts, connectToDatabase } from "@utils/mongo";
import { insertPromptResult, updateUserPromptInfo } from "@utils/prompt_mutations";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {

  // var openai = initializeOpenAiClient();
  // const { topicToGenerateFor } = req.body;
  // const prompt = `
  //   """You are an assistant helping to generate a paragraph based on a prompt.\n
  //   Use this format, replacing text in brackets with the result. Do not include\n
  //   the brackets in the output:
  //   \n\n Summary:\n 
  //   [One Paragraph based on prompt]\n"""\n
  //   ${topicToGenerateFor}
  // `;
  // try {
  //   const mongodb = await connectToDatabase();
  //   const supabase = initializeSupabaseClient();
  //   await updateUserPromptInfo(supabase, { 
  //     prompt,
  //     username: req.body.username,
  //     serviceUsed: "Paragraph Generator",
  //     planName: "basic"
  //   });
  //   const response = await openai.createChatCompletion(
  //     getPrompt({ prompt, maxTokens: 750, temperature: 0.5 })
  //   );
  //   if (isOpenAiResponseValid(response.data)) {
  //     await insertPromptResult(mongodb!, prompt, PromptProducts.ChatGPT3Point5);
  //     return res
  //       .status(200)
  //       .json({ generatedParagraph: response.data.choices[0].message?.content });
  //   }
  //   return res.status(404).json({ message: "No response from OpenAI" });
  // } catch (error: any) {
  //   return res.status(404).json({ message: error.message });
  // }

  //Inactive migrated to c# server, eventually will be removed.
  return res.status(200).json({ chatMessages: "Inactive endpoint."});

}

