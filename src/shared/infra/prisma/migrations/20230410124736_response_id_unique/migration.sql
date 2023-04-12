/*
  Warnings:

  - A unique constraint covering the columns `[response_id]` on the table `Transfer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Transfer_response_id_key" ON "Transfer"("response_id");
