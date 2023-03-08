import ICreateBankAccountDTO from '@modules/bankAccounts/dtos/ICreateBankAccountDTO';
import IBankAccountsRepository from '@modules/bankAccounts/repositories/IBankAccountsRepository';
import { BankAccount, Prisma } from '@prisma/client';
import prisma from '@shared/infra/prisma/client';

export default class BankAccountsRepository implements IBankAccountsRepository {
  private ormRepository: Prisma.BankAccountDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor() {
    this.ormRepository = prisma.bankAccount;
  }

  public async create(data: ICreateBankAccountDTO): Promise<BankAccount> {
    const bankAccount = await this.ormRepository.create({ data });

    return bankAccount;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ where: { id } });
  }

  public async findById(id: string): Promise<BankAccount | null> {
    const bankAccount = await this.ormRepository.findUnique({ where: { id } });

    return bankAccount;
  }

  public async list(): Promise<BankAccount[]> {
    const bankAccounts = await this.ormRepository.findMany();

    return bankAccounts;
  }

  public async findByUser(id: string): Promise<BankAccount[]> {
    const bankAccounts = await this.ormRepository.findMany({
      where: { user_id: id }
    });

    return bankAccounts;
  }

  public async findByBankAgencyAndAccount(
    bank_code: string,
    agency: string,
    account: string
  ): Promise<BankAccount | null> {
    const bankAccount = await this.ormRepository.findFirst({
      where: { AND: [{ bank_code }, { agency }, { account }] }
    });

    return bankAccount;
  }
}
