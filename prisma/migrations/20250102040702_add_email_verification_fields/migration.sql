-- AlterTable
ALTER TABLE "users" ADD COLUMN     "codeExpiry" TIMESTAMP(3),
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verificationCode" TEXT;
