-- AlterTable
ALTER TABLE "users" ADD COLUMN  IF NOT EXISTS "confirmed" BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS "restorePasswordToken"  TEXT DEFAULT '';
