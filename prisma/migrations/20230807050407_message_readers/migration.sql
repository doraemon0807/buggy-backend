-- CreateTable
CREATE TABLE "_MessageReaders" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MessageReaders_AB_unique" ON "_MessageReaders"("A", "B");

-- CreateIndex
CREATE INDEX "_MessageReaders_B_index" ON "_MessageReaders"("B");

-- AddForeignKey
ALTER TABLE "_MessageReaders" ADD CONSTRAINT "_MessageReaders_A_fkey" FOREIGN KEY ("A") REFERENCES "ChatMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MessageReaders" ADD CONSTRAINT "_MessageReaders_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
