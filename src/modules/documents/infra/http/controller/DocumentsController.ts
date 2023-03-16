import CreateDocumentService from '@modules/documents/services/CreateDocumentService';
import DeleteDocumentService from '@modules/documents/services/DeleteDocumentService';
import FindDocumentByIdService from '@modules/documents/services/FindDocumentByIdService';
import ListDocumentsService from '@modules/documents/services/ListDocumentsService';
import { startOfDay } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class DocumentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      expiration_date, issuing_authority, number, type,
    } = req.body;

    const user_id = req.user.id;
    const files = req.files as {[fieldname: string]: Express.Multer.File[]};

    const startOfExpirationDate = startOfDay(new Date(expiration_date));
    const createDocument = container.resolve(CreateDocumentService);

    const document = await createDocument.execute({
      expiration_date: startOfExpirationDate, issuing_authority, number, type, user_id, files
    });

    return res.status(201).json(document);
  }

  public async getDocument(req: Request, res: Response):Promise<Response> {
    const { id } = req.params;
    const user_id = req.user.id;

    const findDocumentById = container.resolve(FindDocumentByIdService);

    const document = await findDocumentById.execute({ id, user_id });

    return res.status(201).json(document);
  }

  public async list(req: Request, res: Response):Promise<Response> {
    const user_id = req.user.id;

    const listDocuments = container.resolve(ListDocumentsService);

    const documents = await listDocuments.execute({ user_id });

    return res.status(201).json(documents);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const user_id = req.user.id;

    const deleteDocument = container.resolve(DeleteDocumentService);

    await deleteDocument.execute({ id, user_id });

    return res.json({});
  }
}
