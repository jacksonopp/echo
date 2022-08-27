/*
  Warnings:

  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username";

-- CreateTable
CREATE TABLE "ShoutAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "ShoutAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShoutAccount_userId_key" ON "ShoutAccount"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ShoutAccount_username_key" ON "ShoutAccount"("username");

-- AddForeignKey
ALTER TABLE "ShoutAccount" ADD CONSTRAINT "ShoutAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
