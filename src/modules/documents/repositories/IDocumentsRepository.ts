import { Document } from '@prisma/client';
import ICreateDocumentDTO from '../dtos/ICreateDocumentDTO';

interface IDocumentsRepository {
  create(data: ICreateDocumentDTO): Promise<Document>;
  listByUser(user_id:string): Promise<Document[]>;
  findById(id: string): Promise<Document|null>;
  findByNumber(number: string): Promise<Document|null>;
  delete(id: string): Promise<void>;
}

export default IDocumentsRepository;
