-- AlterTable
ALTER TABLE "users" ADD COLUMN     "codeExpiry" TIMESTAMP(3),
ADD COLUMN     "verificationCode" TEXT;
