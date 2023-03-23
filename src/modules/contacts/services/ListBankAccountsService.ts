import { BankAccount } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import IContactsRepository from '../repositories/IContactsRepository';

interface IRequest{
  id: string;
}

@injectable()
export default class ListBankAccountsService {
  constructor(
        @inject('BankAccountsRepository')
        private bankAccountsRepository: IContactsRepository
  ) {}

  public async execute({ id }: IRequest): Promise<BankAccount[]> {
    const bankAccounts = await this.bankAccountsRepository.findByUser(id);
    return bankAccounts;
  }
}
