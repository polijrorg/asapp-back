import { BankAccount } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IBankAccountsRepository from '../repositories/IBankAccountsRepository';

interface IRequest {
  bank_code: string;
  agency: string;
  account: string;
  check_digit: string;
  user_id: string;
}

@injectable()
export default class CreateBankAccountService {
  constructor(
    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository
  ) {}

  public async execute({
    bank_code,
    agency,
    account,
    check_digit,
    user_id
  }: IRequest): Promise<BankAccount> {
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
      agency,
      account,
      check_digit,
      user_id
    });

    return bankAccount;
  }
}
