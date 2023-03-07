import { BankAccount } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import IBankAccountsRepository from '../repositories/IBankAccountsRepository';

interface IRequest{
  id: string;
}

@injectable()
export default class ListBankAccountsService {
  constructor(
        @inject('BankAccountsRepository')
        private bankAccountsRepository: IBankAccountsRepository
  ) {}

  public async execute({ id }: IRequest): Promise<BankAccount[]> {
    const bankAccounts = await this.bankAccountsRepository.findByUser(id);
    return bankAccounts;
  }
}
