// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { initializeOpenAiClient } from "../../../utils";
import { PromptProducts, connectToDatabase } from "@utils/mongo";
import { insertPromptResult } from "@utils/prompt_mutations";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // const openai = initializeOpenAiClient();
  // const { concept, size } = req.body;
  // try {
  //     const mongodb = await connectToDatabase();

  //     //In getting response use a couple of sample prompts
  //     const response = await openai.createImage({
  //       prompt: concept,
  //       n: 1, //Number of images generated
  //       size: size, //Size of image
  //       response_format: 'url', //Format of response of base64 or url
  //     });
  //     if(response.data && response.data.data && response.data.data.length > 0) {
  //         await insertPromptResult(mongodb!, concept, PromptProducts.DALLE);
  //         return res.status(200).json({ generatedImage: response.data.data[0].url });
  //     }
  // } catch(error: any) {
  //     return res.status(404).json({ message: error.message });
  // }
  //Inactive migrated to c# server, eventually will be removed.
  return res.status(200).json({ chatMessages: "Inactive endpoint." });
}
