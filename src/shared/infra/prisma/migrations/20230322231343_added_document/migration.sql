/*
  Warnings:

  - Added the required column `document` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "document" TEXT NOT NULL;
