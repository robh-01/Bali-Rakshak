import { createUser } from "../db/userQueries.js";

async function signUpPost(req, res) {
  let { name, email, password, isExpert } = req.body;
  isExpert = isExpert === "true"; // Convert string to boolean
  const user = { name, email, password, isExpert };
  try {
    const createdUser = await createUser(user);
    res.status(201).json(createdUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
}

async function loginPost(req, res) {
  
}

export { signUpPost, loginPost };
