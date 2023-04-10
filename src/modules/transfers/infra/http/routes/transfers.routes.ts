import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import TransfersController from '../controller/TransfersController';

const transfersRouter = Router();

const transfersController = new TransfersController();

transfersRouter.post(
  '/create',
  ensureAuthenticated,
  transfersController.create
);

export default transfersRouter;
