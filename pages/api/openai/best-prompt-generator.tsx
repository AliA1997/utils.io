// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PromptRecommendation } from '../../best-prompt-generator';

const promptRecommendations: PromptRecommendation[] = [
    {
        name: "More Descriptive",
        description: "Add more details to your prompt to make it more descriptive.",
        css_color_code: "#FFA500"
    },
    {
        name: "Mention that you are a human",
        description: "Mention that you are a human in your prompt.",
        css_color_code: "#FF0000"
    },
    {
        name: "Include tasks in prompt",
        description: "Mention specific tasks that you want the AI to perform in your prompt.",
        css_color_code: "#088F8F"
    },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    const { originalPrompt } = req.body;
    try {
        return res.status(200).json({ promptRecommendations: promptRecommendations, updatedPrompt: originalPrompt });
    } catch(error: any) {
        return res.status(404).json({ message: error.message });
    }
}
