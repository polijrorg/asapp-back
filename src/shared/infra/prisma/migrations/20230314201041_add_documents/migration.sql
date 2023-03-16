-- CreateEnum
CREATE TYPE "DocType" AS ENUM ('CNH', 'RG', 'PASSPORT');

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "pep" DROP NOT NULL;

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "type" "DocType" NOT NULL,
    "front" TEXT NOT NULL,
    "back" TEXT,
    "issuing_authority" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
