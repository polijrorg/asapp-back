import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IBankAccountsRepository from '../repositories/IBankAccountsRepository';

interface IRequest{
    id: string
}

@injectable()
export default class DeleteBankAccountService {
  constructor(
        @inject('BankAccountsRepository')
        private bankAccountsRepository: IBankAccountsRepository
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const bankAccountWithId = await this.bankAccountsRepository.findById(id);
    if (!bankAccountWithId) {
      throw new AppError('No bank account with id');
    }
    await this.bankAccountsRepository.delete(id);
  }
}
