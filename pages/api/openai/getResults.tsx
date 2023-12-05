// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeOpenAiClient } from '../../../utils';
import { PromptProducts, connectToDatabase } from '@utils/mongo';
import { insertPromptResult } from '@utils/prompt_mutations';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    const { resultUrl } = req.body;
    try {
        const resultRes = await fetch(resultUrl, { method: 'GET'});
        const resultData = await resultRes.text();
        return res.status(200).json({ resultData });
    } catch(error: any) {
        return res.status(404).json({ message: error.message });
    }
}
