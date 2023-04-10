import { Transfer } from '@prisma/client';
import ICreateTransferDTO from '../dtos/ICreateTransferDTO';

interface ITransfersRepository {
  create(data: ICreateTransferDTO): Promise<Transfer>;
  updateStatus(id: number, status: string): Promise<Transfer>;
  list(): Promise<Transfer[]>;
}

export default ITransfersRepository;
