/*
  Warnings:

  - You are about to drop the `_Mentioned` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Mentioned" DROP CONSTRAINT "_Mentioned_A_fkey";

-- DropForeignKey
ALTER TABLE "_Mentioned" DROP CONSTRAINT "_Mentioned_B_fkey";

-- DropTable
DROP TABLE "_Mentioned";

-- CreateTable
CREATE TABLE "_Tagged" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Tagged_AB_unique" ON "_Tagged"("A", "B");

-- CreateIndex
CREATE INDEX "_Tagged_B_index" ON "_Tagged"("B");

-- AddForeignKey
ALTER TABLE "_Tagged" ADD CONSTRAINT "_Tagged_A_fkey" FOREIGN KEY ("A") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Tagged" ADD CONSTRAINT "_Tagged_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
