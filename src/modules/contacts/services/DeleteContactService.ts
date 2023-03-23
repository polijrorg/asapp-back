import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IContactsRepository from '../repositories/IContactsRepository';

interface IRequest{
    id: string;
    user_id: string;
}

@injectable()
export default class DeleteContactService {
  constructor(
        @inject('ContactRepository')
        private contactsRepository: IContactsRepository
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<void> {
    const contactWithId = await this.contactsRepository.findById(id);
    if (!contactWithId) {
      throw new AppError('No contact with id');
    }

    // Não deixa qualquer user deletar a conta bancária
    if (contactWithId.user_id !== user_id) {
      throw new AppError('Not authorized');
    }
    await this.contactsRepository.delete(id);
  }
}
