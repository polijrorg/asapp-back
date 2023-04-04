import {  Contact } from '@prisma/client';
import ICreateContactDTO from '../dtos/ICreateContactDTO';

interface IContactsRepository {
  create(data: ICreateContactDTO): Promise<Contact>;
  findById(id: string): Promise<Contact | null>;
  findByUser(id: string): Promise<Contact[]>;
  findByBankAgencyAndAccount(
    bank_code: number,
    agency: string,
    account: string
  ): Promise<Contact | null>;
  list(): Promise<Contact[]>;
  delete(id: string): Promise<void>;
}

export default IContactsRepository;
