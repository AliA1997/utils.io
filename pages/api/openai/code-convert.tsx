// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  getPrompt,
  initializeOpenAiClient,
  isOpenAiResponseValid,
} from "../../../utils";
import { PromptProducts, connectToDatabase } from "@utils/mongo";
import { insertPromptResult } from "@utils/prompt_mutations";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // const openai = initializeOpenAiClient();
  // const { codeToConvert, fromProgrammingLanguage, toProgrammingLanguage } =
  //   req.body;
  // const prompt = `
  //       """You are a programmer tasked with converting this code from ${fromProgrammingLanguage} to ${toProgrammingLanguage}:\n
  //       ${codeToConvert}\n
  //       Here are some objects you will need use for this script:\n\n

  //       Tasks:\n
  //       1. Convert code from ${fromProgrammingLanguage} to ${toProgrammingLanguage}.\n
  //       2. Add comments explaining what the code is doing \n"""\n\n
  //       """\n
  //       Convert code\n
  //     """
  //   `;
  // try {
  //   const mongodb = await connectToDatabase();

  //   const response = await openai.createChatCompletion(
  //     getPrompt({ prompt, maxTokens: 1096, temperature: 0 })
  //   );
  //   if (isOpenAiResponseValid(response.data)) {
  //     await insertPromptResult(mongodb!, prompt, PromptProducts.ChatGPT3Point5);
  //     return res
  //       .status(200)
  //       .json({ convertedCode: response.data.choices[0].message?.content });
  //   }
  // } catch (error: any) {
  //   return res.status(404).json({ message: error.message });
  // }

  //Inactive migrated to c# server, eventually will be removed.
  return res.status(200).json({ chatMessages: "Inactive endpoint." });
}
