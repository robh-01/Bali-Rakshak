import { createComment } from "../db/commentQueries.js";

async function addCommentPost(req, res) {
  let { postId } = req.params;

  //mock user data for testing purposes
  // In a real application, you would get this from the authenticated user session
  req.user = {
    id: 5, // Mock user ID
  };

  const { commentContent } = req.body;
  const comment = {
    content: commentContent,
    authorId: req.user.id, // Use the authenticated user's ID
  };
  try {
    const addedComment = await createComment(+postId, comment);
    res.status(201).json(addedComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
}

export { addCommentPost };
