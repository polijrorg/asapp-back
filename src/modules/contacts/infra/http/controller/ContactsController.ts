import CreateContactService from '@modules/contacts/services/CreateContactService';
import DeleteContactService from '@modules/contacts/services/DeleteContactService';
import FindContactByIdService from '@modules/contacts/services/FindContactByIdService';
import ListContactsService from '@modules/contacts/services/ListContactsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ContactsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      bank_name, agency, account, contact_name, country, document
    } = req.body;

    const user_id = req.user.id;

    const createContact = container.resolve(CreateContactService);

    const contact = await createContact.execute({
      bank_name,
      agency,
      account,
      user_id,
      contact_name,
      country,
      document
    });

    return res.status(201).json(contact);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listContacts = container.resolve(ListContactsService);

    const contacts = await listContacts.execute({ id: user_id });

    return res.status(201).json(contacts);
  }

  public async findById(req: Request, res:Response) : Promise<Response> {
    const { id } = req.params;

    const findContactById = container.resolve(FindContactByIdService);

    const contact = await findContactById.execute({ id });

    return res.status(201).json(contact);
  }

  public async delete(req: Request, res: Response) : Promise<Response> {
    const { id } = req.params;

    const user_id = req.user.id;

    const deleteContact = container.resolve(DeleteContactService);

    await deleteContact.execute({ id, user_id });

    return res.status(201).json({});
  }
}
