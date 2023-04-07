-- CreateTable
CREATE TABLE "Transfer" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "destination_user_id" TEXT NOT NULL,
    "response_id" INTEGER NOT NULL,
    "origin_key" INTEGER NOT NULL,
    "ispb" TEXT NOT NULL,
    "checking_account" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "checking_account_type" TEXT NOT NULL,
    "beneficiary_type" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "key_type" TEXT NOT NULL,
    "transfer_type" INTEGER NOT NULL,
    "id_adjustment" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "id_end_to_end" TEXT NOT NULL,
    "transaction_code" TEXT NOT NULL,
    "receipt_id" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "is_credit" BOOLEAN NOT NULL,
    "idTx" TEXT NOT NULL,
    "contact_id" INTEGER NOT NULL,
    "created_at_response" TIMESTAMP(3) NOT NULL,
    "api_id" TEXT NOT NULL,
    "bank_name" TEXT NOT NULL,
    "trusted_destination_id" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_destination_user_id_fkey" FOREIGN KEY ("destination_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
