// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getPrompt, initializeOpenAiClient, isOpenAiResponseValid } from '../../../utils';
import { insertPromptResult } from '@utils/prompt_mutations';
import { PromptProducts, connectToDatabase } from '@utils/mongo';
import { Db } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
//     const openai = initializeOpenAiClient();
//     const { articleToSummarize } = req.body;
//     const prompt =  `
//     """You are an assistant helping to summarize this article based on a prompt.\n
//     Use this format, replacing text in brackets with the result. Do not include\n
//     the brackets in the output:
//     \n\n Summary:\n 
//     [Three Paragraph summary of the article]\n"""\n
//     ${articleToSummarize}
// `;
//     try {
//         const mongodb = await connectToDatabase();
        
//         const response = await openai.createChatCompletion(getPrompt({ prompt, maxTokens: 1096, temperature: 0.5 }));
//         if(isOpenAiResponseValid(response.data)) {
//             await insertPromptResult(mongodb!, prompt, PromptProducts.ChatGPT3Point5);
//             return res.status(200).json({ summary: response.data.choices[0].message?.content });
//         }
//     } catch(error: any) {
//         return res.status(404).json({ message: error.message });
//     }

    //Inactive migrated to c# server, eventually will be removed.
    return res.status(200).json({ chatMessages: "Inactive endpoint."});

}
