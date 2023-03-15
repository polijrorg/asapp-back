import multerConfig from '@config/multer';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import multer from 'multer';
import DocumentsController from '../controller/DocumentsController';

const documentsRouter = Router();

const documentsController = new DocumentsController();

documentsRouter.post('/', ensureAuthenticated, multer(multerConfig).fields([{ name: 'front', maxCount: 1 }, { name: 'back', maxCount: 1 }]), documentsController.create);

export default documentsRouter;
