/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `UserId` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "UserId",
ADD COLUMN     "UserID" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("UserID");
