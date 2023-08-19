/*
  Warnings:

  - You are about to drop the column `mentionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Mention` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Mention" DROP CONSTRAINT "Mention_photoId_fkey";

-- DropForeignKey
ALTER TABLE "Mention" DROP CONSTRAINT "Mention_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "mentionId";

-- DropTable
DROP TABLE "Mention";

-- CreateTable
CREATE TABLE "_Mentioned" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Mentioned_AB_unique" ON "_Mentioned"("A", "B");

-- CreateIndex
CREATE INDEX "_Mentioned_B_index" ON "_Mentioned"("B");

-- AddForeignKey
ALTER TABLE "_Mentioned" ADD CONSTRAINT "_Mentioned_A_fkey" FOREIGN KEY ("A") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Mentioned" ADD CONSTRAINT "_Mentioned_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
