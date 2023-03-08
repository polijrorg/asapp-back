import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IBankAccountsRepository from '../repositories/IBankAccountsRepository';

interface IRequest{
    id: string;
    user_id: string;
}

@injectable()
export default class DeleteBankAccountService {
  constructor(
        @inject('BankAccountsRepository')
        private bankAccountsRepository: IBankAccountsRepository
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<void> {
    const bankAccountWithId = await this.bankAccountsRepository.findById(id);
    if (!bankAccountWithId) {
      throw new AppError('No bank account with id');
    }

    // Não deixa qualquer user deletar a conta bancária
    if (bankAccountWithId.user_id !== user_id) {
      throw new AppError('Not authorized');
    }
    await this.bankAccountsRepository.delete(id);
  }
}
