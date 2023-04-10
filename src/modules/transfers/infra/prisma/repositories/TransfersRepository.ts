import ICreateTransferDTO from '@modules/transfers/dtos/ICreateTransferDTO';
import ITransfersRepository from '@modules/transfers/repositories/ITransfersRepository';
import { Prisma, Transfer } from '@prisma/client';
import prisma from '@shared/infra/prisma/client';

enum KeyStatus {
  'OPEN = 0',
  'PORTING_TO_US = 1',
  'HISTORY = 2',
  'SUGGESTION = 3',
  'TRANSFERRING_TO_US = 4',
  'PORTING_FROM_US = 5',
  'TRANSFERRING_FROM_US = 6',
  'CANCELLED = 7',
  'WAITING_RESOLUTION = 8'
}

export default class TransfersRepository implements ITransfersRepository {
  private ormRepository: Prisma.TransferDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor() {
    this.ormRepository = prisma.transfer;
  }

  async create(data: ICreateTransferDTO): Promise<Transfer> {
    const { id, created_at, ...dataWithoutCreatedAtAndId } = data;

    const transfer = await this.ormRepository.create({
      data: {
        ...dataWithoutCreatedAtAndId,
        response_id: id,
        created_at_response: created_at
      }
    });

    return transfer;
  }

  async updateStatus(
    id: number,
    status: keyof typeof KeyStatus
  ): Promise<Transfer> {
    const transfer = await this.ormRepository.update({
      where: { response_id: id },
      data: {
        status: KeyStatus[status]
      }
    });

    return transfer;
  }

  async list(): Promise<Transfer[]> {
    const transfers = await this.ormRepository.findMany();

    return transfers;
  }
}
