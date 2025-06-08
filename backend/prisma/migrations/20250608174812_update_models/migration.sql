/*
  Warnings:

  - You are about to drop the column `postPhotoLink` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "postPhotoLink",
ADD COLUMN     "imagePath" TEXT;
