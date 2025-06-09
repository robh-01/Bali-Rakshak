import { Router } from "express";
const userRouter = Router();

import { signUpPost, loginPost } from "../controllers/userController.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";

userRouter.post("/signup", signUpPost);
userRouter.post("/login", loginPost);

//verify JWT and return user details
userRouter.get("/verify", authenticateJWT, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "User verified successfully",
    user: req.user,
  });
});

export { userRouter };
