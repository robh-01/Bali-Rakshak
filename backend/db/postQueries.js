import prisma from "./prismaClient.js";

async function createPost(post) {
  const createdPost = await prisma.post.create({
    data: {
      ...post,
    },
  });
  return createdPost;
}

//return all posts
async function getPosts() {
  const posts = await prisma.post.findMany();
  return posts;
}

async function getPostById(postId) {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      comments: true,
    },
  });

  return post;
}

export { createPost, getPosts, getPostById };
