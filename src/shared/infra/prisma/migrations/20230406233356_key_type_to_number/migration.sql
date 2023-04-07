/*
  Warnings:

  - Changed the type of `key_type` on the `Transfer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Transfer" DROP COLUMN "key_type",
ADD COLUMN     "key_type" INTEGER NOT NULL;
