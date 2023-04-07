import { Transfer } from '@prisma/client';
import ICreateTransferDTO from '../dtos/ICreateTransferDTO';

interface ITransfersRepository {
  create(data: ICreateTransferDTO): Promise<Transfer>;
}

export default ITransfersRepository;
