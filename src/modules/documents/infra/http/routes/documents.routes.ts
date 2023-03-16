import multerConfig from '@config/multer';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import validateRequestSchema from '@shared/infra/http/middlewares/validateRequestSchema';
import { Router } from 'express';
import multer from 'multer';
import DocumentsController from '../controller/DocumentsController';
import createDocumentSchema from '../schema/createDocumentSchema';

const documentsRouter = Router();

const documentsController = new DocumentsController();

documentsRouter.post('/', ensureAuthenticated, multer(multerConfig).fields([{ name: 'front', maxCount: 1 }, { name: 'back', maxCount: 1 }]), createDocumentSchema, validateRequestSchema, documentsController.create);

documentsRouter.get('/', ensureAuthenticated, documentsController.list);

documentsRouter.get('/:id', ensureAuthenticated, documentsController.getDocument);

documentsRouter.delete('/:id', ensureAuthenticated, documentsController.delete);

export default documentsRouter;
