import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
  const res = await openai
    .createCompletion(
      {
        model,
        prompt,
        temperature: 0.9,
        max_tokens: 1024,
      }
      // {
      //   proxy: {
      //     host: "127.0.0.1",
      //     port: 3213
      //   },
      // }
    )
    .then((res) => res.data.choices[0].text)
    .catch(
      (err) =>
        `ChatGPT was unable to find an answer for that question! (Error : ${err.message}`
    );
  return res;
};

export default query;
