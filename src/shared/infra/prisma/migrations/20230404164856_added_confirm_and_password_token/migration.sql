-- AlterTable
ALTER TABLE "users" ADD COLUMN     "confirmed" BOOLEAN DEFAULT false,
ADD COLUMN     "restorePasswordToken" TEXT DEFAULT '';
