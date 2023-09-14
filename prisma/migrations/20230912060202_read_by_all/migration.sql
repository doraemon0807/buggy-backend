/*
  Warnings:

  - You are about to drop the column `read` on the `ChatMessage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "read",
ADD COLUMN     "readByAll" BOOLEAN NOT NULL DEFAULT false;
