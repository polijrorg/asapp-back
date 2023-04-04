import { Contact } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { banksObject } from '@config/banks';
import IContactsRepository from '../repositories/IContactsRepository';

enum Countries {
  BR = 'BR', US = 'US', UK = 'UK', CH = 'CH', IT = 'IT'
}

interface IRequest {
  bank_name: keyof typeof banksObject;
  agency: string;
  account: string;
  contact_name: string;
  user_id: string;
  country: Countries;
  document: string;
}

@injectable()
export default class CreateContactService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository
  ) {}

  public async execute({
    bank_name,
    contact_name,
    agency,
    account,
    user_id,
    country,
    document
  }: IRequest): Promise<Contact> {
    if (!banksObject[bank_name]) throw new AppError('Invalid Bank name');
    const bank_code = banksObject[bank_name];

    const contactAlreadyExists = await this.contactsRepository.findByBankAgencyAndAccount(
      bank_code,
      agency,
      account
    );

    if (contactAlreadyExists) {
      throw new AppError('Contact already exists ');
    }

    const contact = await this.contactsRepository.create({
      bank_code,
      bank_name,
      contact_name,
      agency,
      account,
      user_id,
      country,
      document
    });

    return contact;
  }
}
