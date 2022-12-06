-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "profileimage" TEXT NOT NULL DEFAULT 'https://i.kym-cdn.com/photos/images/newsfeed/001/948/851/b69.png',
    "salt" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "session" TEXT NOT NULL
);
INSERT INTO "new_user" ("hash", "id", "profileimage", "salt", "session", "username") SELECT "hash", "id", "profileimage", "salt", "session", "username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
CREATE UNIQUE INDEX "user_salt_key" ON "user"("salt");
CREATE UNIQUE INDEX "user_hash_key" ON "user"("hash");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
