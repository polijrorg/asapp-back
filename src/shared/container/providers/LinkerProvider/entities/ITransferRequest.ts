interface IContactDetails {
  key_type: number;
  trade_name: string;
  document: string;
  nickname: string;
  bank_code: string;
  bank_agency: string;
  bank_account_number: string;
  bank_account_type: string;
  checking_account: string;
}

export default interface ITransferRequest {
  request_type: 'PIX_OPEN_API';
  request_sub_type: 'PIX_OPEN_API_CREATE';
  cnpj: string;
  request_payload: {
    cnpj: string;
    transfer_type: number;
    contact_email: string;
    notification: boolean;
    amount: number;
    destiny_key?: string;
    contact_id?: number;
    contact_key_id?: number;
    contact_details?: IContactDetails;
  };
}
