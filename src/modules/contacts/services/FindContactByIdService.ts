import { Contact } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IContactsRepository from '../repositories/IContactsRepository';

interface IRequest{
  id: string;

}

@injectable()
export default class FindContactByIdService {
  constructor(
        @inject('ContactsRepository')
        private contactsRepository: IContactsRepository
  ) {}

  public async execute({ id }:IRequest): Promise<Contact> {
    const contact = await this.contactsRepository.findById(id);
    if (!contact) {
      throw new AppError('No contact found');
    }
    return contact;
  }
}
