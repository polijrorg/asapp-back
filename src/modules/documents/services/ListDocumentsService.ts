import { Document } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import IDocumentsRepository from '../repositories/IDocumentsRepository';

interface IRequest {
    user_id: string;
}

@injectable()
export default class ListDocumentsService {
  constructor(
    @inject('DocumentsRepository')
    private documentsRepository: IDocumentsRepository,

  ) {}

  public async execute({
    user_id
  }: IRequest): Promise<Document[]> {
    const documents = await this.documentsRepository.listByUser(user_id);

    return documents;
  }
}
