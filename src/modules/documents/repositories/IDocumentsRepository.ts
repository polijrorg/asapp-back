import { Document } from '@prisma/client';
import ICreateDocumentDTO from '../dtos/ICreateDocumentDTO';

interface IDocumentsRepository {
  create(data: ICreateDocumentDTO): Promise<Document>;
}

export default IDocumentsRepository;
