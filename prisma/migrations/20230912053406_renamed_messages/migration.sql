/*
  Warnings:

  - You are about to drop the column `chatRoomId` on the `ChatMessage` table. All the data in the column will be lost.
  - Added the required column `roomId` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_chatRoomId_fkey";

-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "chatRoomId",
ADD COLUMN     "roomId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "ChatRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
