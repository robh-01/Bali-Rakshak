import { Router } from "express";
const userRouter = Router();

import { signUpPost } from "../controllers/userController.js";

userRouter.post("/signup", signUpPost);

export { userRouter };
