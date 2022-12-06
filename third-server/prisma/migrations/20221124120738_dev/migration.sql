/*
  Warnings:

  - Made the column `profileURL` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "profileimage" TEXT NOT NULL DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
    "profileURL" TEXT NOT NULL,
    "profilebio" TEXT,
    "salt" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "session" TEXT NOT NULL
);
INSERT INTO "new_user" ("hash", "id", "profileURL", "profilebio", "profileimage", "salt", "session", "username") SELECT "hash", "id", "profileURL", "profilebio", "profileimage", "salt", "session", "username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
CREATE UNIQUE INDEX "user_profileURL_key" ON "user"("profileURL");
CREATE UNIQUE INDEX "user_salt_key" ON "user"("salt");
CREATE UNIQUE INDEX "user_hash_key" ON "user"("hash");
CREATE UNIQUE INDEX "user_session_key" ON "user"("session");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
