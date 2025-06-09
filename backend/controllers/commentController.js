import { createComment } from "../db/commentQueries.js";
import prisma from "../db/prismaClient.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";

const addCommentPost = [
  authenticateJWT,
  async (req, res) => {
    let { postId } = req.params;
    const { commentContent } = req.body;
    const comment = {
      content: commentContent,
      authorId: req.user.id,
    };
    try {
      // Create the comment
      const addedComment = await createComment(+postId, comment);

      // Fetch the comment again, including the author name
      const commentWithAuthor = await prisma.comment.findUnique({
        where: { id: addedComment.id },
        select: {
          id: true,
          content: true,
          author: { select: { name: true } },
        },
      });

      res.status(201).json(commentWithAuthor);
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ error: "Failed to add comment" });
    }
  },
];

export { addCommentPost };
