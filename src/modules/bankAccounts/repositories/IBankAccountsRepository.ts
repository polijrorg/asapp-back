import { BankAccount } from '@prisma/client';
import ICreateBankAccountDTO from '../dtos/ICreateBankAccountDTO';

interface IBankAccountsRepository {
  create(data: ICreateBankAccountDTO): Promise<BankAccount>;
  findById(id: string): Promise<BankAccount | null>;
  findByUser(id: string): Promise<BankAccount[]>;
  findByBankAgencyAndAccount(
    bank_code: string,
    agency: string,
    account: string
  ): Promise<BankAccount | null>;
  list(): Promise<BankAccount[]>;
  delete(id: string): Promise<void>;
}

export default IBankAccountsRepository;
