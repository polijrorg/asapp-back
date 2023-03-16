import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IDocumentsRepository from '../repositories/IDocumentsRepository';

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
export default class DeleteDocumentService {
  constructor(
    @inject('DocumentsRepository')
    private documentsRepository: IDocumentsRepository,

  ) {}

  public async execute({
    id, user_id
  }: IRequest): Promise<void> {
    const documentWithId = await this.documentsRepository.findById(id);
    if (!documentWithId) {
      throw new AppError('Document not found');
    }
    if (documentWithId?.user_id !== user_id) {
      throw new AppError('Not authorized');
    }
    await this.documentsRepository.delete(id);
  }
}
