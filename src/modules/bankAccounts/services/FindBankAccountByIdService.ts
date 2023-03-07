import { BankAccount } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IBankAccountsRepository from '../repositories/IBankAccountsRepository';

interface IRequest{
  id: string
}

@injectable()
export default class FindBankAccountByIdService {
  constructor(
        @inject('BankAccountsRepository')
        private bankAccountsRepository: IBankAccountsRepository
  ) {}

  public async execute({ id }:IRequest): Promise<BankAccount> {
    const bankAccount = await this.bankAccountsRepository.findById(id);
    if (!bankAccount) {
      throw new AppError('No bank account found');
    }

    return bankAccount;
  }
}
