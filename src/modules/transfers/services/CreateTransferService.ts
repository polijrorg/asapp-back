import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import { Transfer } from '@prisma/client';
import ILinkerProvider from '@shared/container/providers/LinkerProvider/models/ILinkerProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { pick } from 'underscore';
import ITransfersRepository from '../repositories/ITransfersRepository';

interface IRequest {
  contact_id: string;
  user_id: string;
  amount: number;
}

@injectable()
export default class CreateTransferService {
  constructor(
    @inject('TransfersRepository')
    private transfersRepository: ITransfersRepository,

    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,

    @inject('LinkerProvider')
    private linkerProvider: ILinkerProvider
  ) {}

  public async execute({
    contact_id,
    amount,
    user_id
  }: IRequest): Promise<
    Pick<
      Transfer,
      | 'contact_id'
      | 'amount'
      | 'user_id'
      | 'id'
      | 'key'
      | 'name'
      | 'status'
      | 'created_at'
      | 'bank_name'
    >
  > {
    const destinationContact = await this.contactsRepository.findById(
      contact_id
    );

    if (!destinationContact) {
      throw new AppError('Contact not found');
    }

    if (destinationContact.user_id !== user_id) {
      throw new AppError('Not authorized');
    }

    if (!destinationContact.pix_key || !destinationContact.email) {
      throw new AppError('Contact does not have email or pix key');
    }

    // Faz a request pra api do linker
    const transferResponse = await this.linkerProvider.createTransfer({
      contact_email: destinationContact.email,
      amount,
      destiny_key: destinationContact.pix_key
    });

    const { contact_id: contact_id_response, ...transferWithoutContactId } =
      transferResponse;

    // Cria o registro da transferência no db
    const transfer = await this.transfersRepository.create({
      ...transferWithoutContactId,
      contact_id_response,
      contact_id,
      user_id
    });

    return pick(
      transfer,
      'id',
      'created_at',
      'user_id',
      'bank_name',
      'amount',
      'key',
      'name',
      'contact_id',
      'status'
    );
  }
}
