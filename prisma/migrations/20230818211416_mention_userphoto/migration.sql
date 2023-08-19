/*
  Warnings:

  - You are about to drop the column `mentionId` on the `Photo` table. All the data in the column will be lost.
  - Added the required column `photoId` to the `Mention` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Mention` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_mentionId_fkey";

-- AlterTable
ALTER TABLE "Mention" ADD COLUMN     "photoId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "mentionId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mentionId" INTEGER;

-- AddForeignKey
ALTER TABLE "Mention" ADD CONSTRAINT "Mention_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mention" ADD CONSTRAINT "Mention_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
