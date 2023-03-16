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

    public async listByUser(user_id: string): Promise<Document[]> {
      const documents = await this.ormRepository.findMany({ where: { user_id } });

      return documents;
    }

    public async findById(id: string): Promise<Document | null> {
      const document = await this.ormRepository.findUnique({
        where: {
          id
        }
      });
      return document;
    }

    public async findByNumber(number: string): Promise<Document | null> {
      const document = await this.ormRepository.findFirst({ where: { number } });

      return document;
    }

    public async delete(id: string): Promise<void> {
      await this.ormRepository.delete({ where: { id } });
    }
}
