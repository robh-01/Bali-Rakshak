import { Router } from "express";
const commentRouter = Router();

import { addCommentPost } from "../controllers/commentController.js";

commentRouter.post("/:postId", addCommentPost);

export { commentRouter };
