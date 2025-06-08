import { exp } from "@tensorflow/tfjs-node";
import { Router } from "express";
const postRouter = Router();

import { postCreatePost, allPostGet } from "../controllers/postController.js";

postRouter.post("/create", postCreatePost);
postRouter.get("", allPostGet);

export { postRouter };
