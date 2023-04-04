-- CreateEnum
CREATE TYPE "Countries" AS ENUM ('BR', 'UK', 'US', 'IT', 'CH');

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "bank_code" INTEGER NOT NULL,
    "bank_name" TEXT NOT NULL,
    "country" "Countries" NOT NULL,
    "contact_name" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
