/*
  Warnings:

  - You are about to drop the column `account_name` on the `bank_accounts` table. All the data in the column will be lost.
  - Added the required column `beneficiary_name` to the `bank_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bank_accounts" DROP COLUMN "account_name",
ADD COLUMN     "beneficiary_name" TEXT NOT NULL;
