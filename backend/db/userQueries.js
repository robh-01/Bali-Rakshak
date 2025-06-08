import prisma from "./prismaClient.js";

async function createUser(user) {
  const createdUser = await prisma.user.create({
    data: {
      ...user,
    },
  });
  return createdUser;
}

async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id },
    omit: {
      password: true,
    },
  });
  return user;
}

export { createUser, getUserById };
