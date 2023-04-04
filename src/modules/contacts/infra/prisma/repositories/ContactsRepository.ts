import ICreateContactDTO from '@modules/contacts/dtos/ICreateContactDTO';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import { Prisma, Contact } from '@prisma/client';
import prisma from '@shared/infra/prisma/client';

export default class ContactsRepository implements IContactsRepository {
  private ormRepository: Prisma.ContactDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor() {
    this.ormRepository = prisma.contact;
  }

  public async create(data: ICreateContactDTO): Promise<Contact> {
    const contact = await this.ormRepository.create({ data });

    return contact;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ where: { id } });
  }

  public async findById(id: string): Promise<Contact | null> {
    const contact = await this.ormRepository.findUnique({ where: { id } });

    return contact;
  }

  public async list(): Promise<Contact[]> {
    const contacts = await this.ormRepository.findMany();

    return contacts;
  }

  public async findByUser(id: string): Promise<Contact[]> {
    const contacts = await this.ormRepository.findMany({
      where: { user_id: id }
    });

    return contacts;
  }

  public async findByBankAgencyAndAccount(
    bank_code: number,
    agency: string,
    account: string
  ): Promise<Contact | null> {
    const contact = await this.ormRepository.findFirst({
      where: { AND: [{ bank_code }, { agency }, { account }] }
    });

    return contact;
  }
}
