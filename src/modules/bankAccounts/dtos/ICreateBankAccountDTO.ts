interface ICreateBankAccountDTO {
  bank_code: string;
  agency: string;
  account: string;
  check_digit: string;
  user_id: string;
}

export default ICreateBankAccountDTO;
