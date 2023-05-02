import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoute from "./routes/auth.js";
mongoose.set("strictQuery", true);
const app = express();

dotenv.config();

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
