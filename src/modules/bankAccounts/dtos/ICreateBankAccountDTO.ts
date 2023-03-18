interface ICreateBankAccountDTO {
  bank_code: number;
  account_name: string;
  bank_name: string;
  agency: string;
  account: string;
  check_digit: string;
  user_id: string;
}

export default ICreateBankAccountDTO;
