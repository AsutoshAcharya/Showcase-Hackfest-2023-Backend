import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const aiChat = async (req, res, next) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.7,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (err) {
    next(err);
  }
};

export const getChat = async (req, res, next) => {
  try {
    res.status(200).send({
      message: "hello from ai server",
    });
  } catch (err) {
    next(err);
  }
};
