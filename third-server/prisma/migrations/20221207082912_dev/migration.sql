-- CreateTable
CREATE TABLE "_postTouser" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_postTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_postTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_postTouser_AB_unique" ON "_postTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_postTouser_B_index" ON "_postTouser"("B");
