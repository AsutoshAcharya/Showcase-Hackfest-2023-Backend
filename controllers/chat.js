import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import path from "path";

// const openai = new OpenAIApi(configuration);

// export const aiChat = async (req, res, next) => {
//   try {
//     const prompt = req.body.prompt;
//     console.log(prompt);

//     const response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `${prompt}`,
//       temperature: 0.7,
//       max_tokens: 3000,
//       top_p: 1,
//       frequency_penalty: 0.5,
//       presence_penalty: 0,
//     });
//     console.log(response);
//     res.status(200).send({
//       bot: response.data.choices[0].text,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

export const getChat = async (req, res, next) => {
  try {
    res.status(200).send({
      message: "hello from ai server",
    });
  } catch (err) {
    next(err);
  }
};
