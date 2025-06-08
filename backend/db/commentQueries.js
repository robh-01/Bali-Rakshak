import prisma from "./prismaClient.js";

//takes id of a post to add a comment on and comment object with the data of the comment
async function createComment(postId, comment) {
  const addedComment = await prisma.comment.create({
    data: {
      ...comment,
      postId,
    },
  });

  return addedComment;
}

export { createComment };
