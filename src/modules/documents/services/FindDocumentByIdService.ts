import { Document } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IDocumentsRepository from '../repositories/IDocumentsRepository';

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
export default class FindDocumentByIdService {
  constructor(
    @inject('DocumentsRepository')
    private documentsRepository: IDocumentsRepository,

  ) {}

  public async execute({
    id, user_id
  }: IRequest): Promise<Document> {
    const document = await this.documentsRepository.findById(id);
    if (!document) {
      throw new AppError('Document not found');
    }
    if (document?.user_id !== user_id) {
      throw new AppError('Not authorized');
    }
    return document;
  }
}
