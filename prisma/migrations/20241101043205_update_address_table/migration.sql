/*
  Warnings:

  - You are about to drop the column `userId` on the `address` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_userId_fkey";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
