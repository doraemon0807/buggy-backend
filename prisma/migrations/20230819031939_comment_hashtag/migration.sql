-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "hashtagId" INTEGER;

-- CreateTable
CREATE TABLE "_CommentToHashtag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CommentToHashtag_AB_unique" ON "_CommentToHashtag"("A", "B");

-- CreateIndex
CREATE INDEX "_CommentToHashtag_B_index" ON "_CommentToHashtag"("B");

-- AddForeignKey
ALTER TABLE "_CommentToHashtag" ADD CONSTRAINT "_CommentToHashtag_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentToHashtag" ADD CONSTRAINT "_CommentToHashtag_B_fkey" FOREIGN KEY ("B") REFERENCES "Hashtag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
