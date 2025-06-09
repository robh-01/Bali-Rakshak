import { Router } from "express";

const aiAnswerRouter = Router();
import { getAiAnswer } from "../controllers/aiAnswerController.js";

aiAnswerRouter.post("", getAiAnswer);

export { aiAnswerRouter };
