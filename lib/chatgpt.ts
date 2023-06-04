import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
  organization: "org-tqGGXvERE6z05szfHgOF2WOg",
});
const openai = new OpenAIApi(configuration);
export default openai;
