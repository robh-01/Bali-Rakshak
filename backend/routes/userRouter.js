import { Router } from "express";
const userRouter = Router();

import { signUpPost, loginPost } from "../controllers/userController.js";

userRouter.post("/signup", signUpPost);
userRouter.post("/login", loginPost);

export { userRouter };
