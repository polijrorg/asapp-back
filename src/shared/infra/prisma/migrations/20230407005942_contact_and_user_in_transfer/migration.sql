/*
  Warnings:

  - You are about to drop the column `destination_user_id` on the `Transfer` table. All the data in the column will be lost.
  - Added the required column `contact_id_response` to the `Transfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Transfer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_destination_user_id_fkey";

-- AlterTable
ALTER TABLE "Transfer" DROP COLUMN "destination_user_id",
ADD COLUMN     "contact_id_response" INTEGER NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "contact_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "email" TEXT,
ADD COLUMN     "pix_key" TEXT;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
