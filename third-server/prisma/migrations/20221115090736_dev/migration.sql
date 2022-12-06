-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "profileimage" TEXT NOT NULL DEFAULT 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fknowyourmeme.com%2Fmemes%2Fwhen-the-imposter-is-sus-sus-jerma&psig=AOvVaw0yMlWTSBmMdra2LPIf7m8n&ust=1668589614337000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCPDk4PHqr_sCFQAAAAAdAAAAABAD',
    "salt" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "session" TEXT NOT NULL
);
INSERT INTO "new_user" ("hash", "id", "salt", "session", "username") SELECT "hash", "id", "salt", "session", "username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
CREATE UNIQUE INDEX "user_salt_key" ON "user"("salt");
CREATE UNIQUE INDEX "user_hash_key" ON "user"("hash");
CREATE UNIQUE INDEX "user_session_key" ON "user"("session");
CREATE TABLE "new_post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_post" ("authorId", "content", "id", "private", "title") SELECT "authorId", "content", "id", "private", "title" FROM "post";
DROP TABLE "post";
ALTER TABLE "new_post" RENAME TO "post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
