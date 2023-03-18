/*
  Warnings:

  - Added the required column `account_name` to the `bank_accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bank_name` to the `bank_accounts` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `bank_code` on the `bank_accounts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "bank_accounts" ADD COLUMN     "account_name" TEXT NOT NULL,
ADD COLUMN     "bank_name" TEXT NOT NULL,
DROP COLUMN "bank_code",
ADD COLUMN     "bank_code" INTEGER NOT NULL;
