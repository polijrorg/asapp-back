-- AlterTable
ALTER TABLE "users" ADD COLUMN     "confirmed" BOOLEAN DEFAULT false,
ADD COLUMN  "restorePasswordToken" IF NOT EXISTS TEXT DEFAULT '';
