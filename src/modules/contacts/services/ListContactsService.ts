import { Contact } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import IContactsRepository from '../repositories/IContactsRepository';

interface IRequest{
  id: string;
}

@injectable()
export default class ListContactsService {
  constructor(
        @inject('ContactsRepository')
        private contactsRepository: IContactsRepository
  ) {}

  public async execute({ id }: IRequest): Promise<Contact[]> {
    const contacts = await this.contactsRepository.findByUser(id);
    return contacts;
  }
}
