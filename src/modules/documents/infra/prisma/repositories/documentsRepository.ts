import ICreateDocumentDTO from '@modules/documents/dtos/ICreateDocumentDTO';
import IDocumentsRepository from '@modules/documents/repositories/IDocumentsRepository';
import { Document, Prisma } from '@prisma/client';
import prisma from '@shared/infra/prisma/client';

export default class DocumentsRepository implements IDocumentsRepository {
    private ormRepository: Prisma.DocumentDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

    constructor() {
      this.ormRepository = prisma.document;
    }

    public async create(data: ICreateDocumentDTO): Promise<Document> {
      const document = await this.ormRepository.create({ data });

      return document;
    }
}
