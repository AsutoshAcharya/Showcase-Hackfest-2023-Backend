import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoute from "./routes/auth.js";
import chatRoute from "./routes/aichat.js";
import { Configuration, OpenAIApi } from "openai";

mongoose.set("strictQuery", true);

dotenv.config();
const app = express();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const aiChat = async (req, res, next) => {
  try {
    const prompt = req.body.prompt;
    console.log(prompt);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.7,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    console.log(response);
    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (err) {
    next(err);
  }
};

const connect = async () => {
  try {
    await mongoose.connect(process.env.mongo);
    console.log("connected to mongodb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected");
});

//middleware
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/chat", aiChat);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  console.log("server started at port 8800");
  connect();
  console.log("connected to backend");
});
