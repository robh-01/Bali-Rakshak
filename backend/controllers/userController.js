import { createUser, getUserByPhone } from "../db/userQueries.js";
import jwt from "jsonwebtoken";

async function signUpPost(req, res) {
  let { name, phone, password, isExpert } = req.body;
  isExpert = isExpert === "true"; // Convert string to boolean
  const user = { name, phone, password, isExpert };
  try {
    const createdUser = await createUser(user);
    res.status(201).json(createdUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
}

async function loginPost(req, res, next) {
  const { phone, password } = req.body;
  try {
    const user = await getUserByPhone(phone);
    if (!user) {
      return res.status(401).json({
        status: "failure",
        message: "Invalid credentials.",
      });
    }

    const isMatch = user.password === password;
    if (!isMatch) {
      return res.status(401).json({
        status: "failure",
        message: "Invalid credentials.",
      });
    }

    const payload = {
      sub: user.id,
    };
    const opts = {
      expiresIn: "2h",
      algorithm: "HS256",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, opts);
    res.status(200).json({
      status: "success",
      message: `User ${user.username} logged in successfully`,
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      status: "failure",
      message: "Unable to login at the moment. Please try again later",
    });
  }
}

export { signUpPost, loginPost };
