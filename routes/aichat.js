import express from "express";
import { getChat } from "../controllers/chat.js";
const router = express.Router();

// router.post("/", aiChat);
router.get("/", getChat);
export default router;
