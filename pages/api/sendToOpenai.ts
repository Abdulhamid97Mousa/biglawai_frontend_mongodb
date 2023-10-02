import type { NextApiRequest, NextApiResponse } from "next";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure this API endpoint is only used with POST
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed, use POST" });
    return;
  }

  const {
    input,

    openAIKey,
  }: { input: string; openAIKey: string } = req.body;

  console.log(req.body.openAIKey);

  console.log("Input:", input);
  console.log("OpenAI Key:", openAIKey);

  const configuration = new Configuration({
    apiKey: openAIKey,
  });

  const openai = new OpenAIApi(configuration);

  const model = "gpt-3.5-turbo";

  // Remove 'messages' mapping and 'user' message push
  let chatMessages: ChatCompletionRequestMessage[] = [];

  // Add the system message
  chatMessages.push({
    role: "system",
    content: "You are a helpful assistant.",
  });

  // Add the user's message
  chatMessages.push({
    role: "user",
    content: input, //+ " the output language should be in chinese",
  });

  try {
    const gptResponse = await openai.createChatCompletion(
      {
        model,
        messages: chatMessages,
      },
      {
        proxy: {
          host: "127.0.0.1",
          port: 7890,
        },
      }
    );

    let text = "OpenAI was unable to find an answer for that question!";
    if (
      gptResponse.data &&
      gptResponse.data.choices &&
      gptResponse.data.choices.length > 0 &&
      gptResponse.data.choices[0].message
    ) {
      text = gptResponse.data.choices[0].message.content || "No content";
    }

    res.status(200).json({ text });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error detail:", error);
      res.status(500).json({
        message: "An error occurred while making a request to OpenAI",
        error: error.toString(),
      });
    }
  }
}
