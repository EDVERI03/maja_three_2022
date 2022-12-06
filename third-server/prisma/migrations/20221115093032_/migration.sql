/*
  Warnings:

  - A unique constraint covering the columns `[session]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_session_key" ON "user"("session");
