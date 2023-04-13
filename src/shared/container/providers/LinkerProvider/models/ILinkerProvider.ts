
import ICreateTransferDTO from '../dtos/ICreateTransferDTO';
import ITransferResponse from '../entities/ITransferResponse';

export default interface ILinkerProvider {
  createTransfer(data: ICreateTransferDTO): Promise<ITransferResponse>;
}
