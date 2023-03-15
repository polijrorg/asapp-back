import CreateDocumentService from '@modules/documents/services/CreateDocumentService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class DocumentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      expiration_date, issuing_authority, number, type,
    } = req.body;

    const user_id = req.user.id;
    const files = req.files as {[fieldname: string]: Express.Multer.File[]};

    const createDocument = container.resolve(CreateDocumentService);

    const document = await createDocument.execute({
      expiration_date, issuing_authority, number, type, user_id, files
    });

    return res.status(201).json(document);
  }
}
