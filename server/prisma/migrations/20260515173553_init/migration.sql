/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `passwordHash` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[UserName]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `UserName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_userName_key";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "passwordHash",
DROP COLUMN "userId",
DROP COLUMN "userName",
ADD COLUMN     "PasswordHash" TEXT,
ADD COLUMN     "UserId" SERIAL NOT NULL,
ADD COLUMN     "UserName" TEXT NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("UserId");

-- CreateIndex
CREATE UNIQUE INDEX "users_UserName_key" ON "users"("UserName");
