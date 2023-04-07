import ICreateTransferDTO from '@modules/transfers/dtos/ICreateTransferDTO';
import ITransfersRepository from '@modules/transfers/repositories/ITransfersRepository';
import { Prisma, Transfer } from '@prisma/client';
import prisma from '@shared/infra/prisma/client';

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
}
