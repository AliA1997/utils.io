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
  //   const openai = initializeOpenAiClient();
  //   const {
  //     nameOfComponent,
  //     webFrameworkUsed,
  //     uiLibraryUsed,
  //     purposeOfComponent,
  //     howIsComponentStyled,
  //     web3WalletFeatureUsed,
  //   } = req.body;
  //   const prompt = `
  //   """
  //   ${
  //     uiLibraryUsed
  //       ? `You are a programmer tasked with writing a UI component that is built for ${webFrameworkUsed} in ${uiLibraryUsed} UI Library.`
  //       : `You are a programmer tasked with writing a UI component that is built for ${webFrameworkUsed}.`
  //   }\n
  //   ${
  //     howIsComponentStyled
  //       ? `This component is styled using ${howIsComponentStyled}.\n`
  //       : ""
  //   }
  //   Here are some objects you will need use for this script:\n\n

  //   Tasks:\n
  //   1. The name of the component would be ${nameOfComponent}.\n
  //   2. The component would be responsible for ${purposeOfComponent}.\n
  //   ${
  //     web3WalletFeatureUsed
  //       ? `3. This component integrates with ${web3WalletFeatureUsed}.\n`
  //       : ""
  //   } \n"""\n\n
  //   """\n
  //   Generate ui component:\n
  //   """\n
  // `;
  //   try {
  //     const mongodb = await connectToDatabase();

  //     const response = await openai.createChatCompletion(
  //       getPrompt({ prompt, maxTokens: 6000, temperature: 0.9 })
  //     );

  //     if (isOpenAiResponseValid(response.data)) {
  //       await insertPromptResult(mongodb!, prompt, PromptProducts.ChatGPT3Point5);
  //       return res
  //         .status(200)
  //         .json({ uiComponentCode: response.data.choices[0].message?.content });
  //     }
  //   } catch (error: any) {
  //     return res.status(404).json({ message: error.message });
  //   }
  //Inactive migrated to c# server, eventually will be removed.
  return res.status(200).json({ chatMessages: "Inactive endpoint." });
}
