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
  const openai = initializeOpenAiClient();
  // contractName: sCFormData.contractName, blockchain: sCFormData.blockchain, whatDoesItDo: sCFormData.whatDoesItDo, tokenStandard: sCFormData.tokenStandard
  //   const { blockchain, tokenStandard, contractName, whatDoesItDo } = req.body;
  //   const prompt = `
  //   """You are a programmer tasked with writing a smart contract that built for the ${blockchain} blockchain in ${
  //       ["Ethereum", "Polygon"].some((l) => l === blockchain)
  //         ? "Solidity"
  //         : "Rust"
  //     }.\n
  //   Here are some objects you will need use for this script:\n\n

  //   Tasks:\n
  //   1. Write a smart contract that is named ${contractName}.\n
  //   2. Write a smart contract that based off the ${tokenStandard} token standard.\n
  //   3. This contract would be responsible for doing ${whatDoesItDo} \n"""\n\n
  //   """\n
  //   Generate smart contract\n
  //   """
  // `;
  //   try {
  //     const mongodb = await connectToDatabase();

  //     const response = await openai.createChatCompletion(getPrompt({ prompt, maxTokens: 2200, topP: 1.0 }));
  //     if (isOpenAiResponseValid(response.data)) {
  //       await insertPromptResult(mongodb!, prompt, PromptProducts.ChatGPT3Point5);
  //       return res
  //         .status(200)
  //         .json({ generatedCode: response.data.choices[0].message?.content });
  //     }
  //   } catch (error: any) {
  //     return res.status(404).json({ message: error.message });
  //   }

  //Inactive migrated to c# server, eventually will be removed.
  return res.status(200).json({ chatMessages: "Inactive endpoint." });
}
