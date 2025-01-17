-- CreateTable
CREATE TABLE "comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT,
    "postId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
