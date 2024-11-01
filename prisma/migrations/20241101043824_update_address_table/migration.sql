/*
  Warnings:

  - You are about to drop the column `userEmail` on the `address` table. All the data in the column will be lost.
  - Added the required column `userId` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_userEmail_fkey";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "userEmail",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
