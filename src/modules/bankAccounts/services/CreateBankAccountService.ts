import { BankAccount } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { banksObject } from '@config/banks';
import IBankAccountsRepository from '../repositories/IBankAccountsRepository';

interface IRequest {
  bank_name: keyof typeof banksObject;
  agency: string;
  account: string;
  check_digit: string;
  beneficiary_name: string;
  cpf: string;
  user_id: string;
}

@injectable()
export default class CreateBankAccountService {
  constructor(
    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository
  ) {}

  public async execute({
    bank_name,
    beneficiary_name,
    cpf,
    agency,
    account,
    check_digit,
    user_id
  }: IRequest): Promise<BankAccount> {
    if (!banksObject[bank_name]) throw new AppError('Invalid Bank name');
    const bank_code = banksObject[bank_name];

    const bankAccountAlreadyExists = await this.bankAccountsRepository.findByBankAgencyAndAccount(
      bank_code,
      agency,
      account
    );

    if (bankAccountAlreadyExists) {
      throw new AppError('Bank account already exists ');
    }

    const bankAccount = await this.bankAccountsRepository.create({
      bank_code,
      bank_name,
      beneficiary_name,
      cpf,
      agency,
      account,
      check_digit,
      user_id
    });

    return bankAccount;
  }
}
