interface ICreateBankAccountDTO {
  bank_code: number;
  beneficiary_name: string;
  cpf: string;
  bank_name: string;
  agency: string;
  account: string;
  check_digit: string;
  user_id: string;
}

export default ICreateBankAccountDTO;
