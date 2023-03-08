import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import validateRequestSchema from '@shared/infra/http/middlewares/validateRequestSchema';
import { Router } from 'express';
import BankAccountsController from '../controller/BankAccountsController';
import bankAccountSchema from '../schemas/bankAccountSchema';

const bankAccountsRouter = Router();

const bankAccountsController = new BankAccountsController();

bankAccountsRouter.post('/', bankAccountSchema, validateRequestSchema, ensureAuthenticated, bankAccountsController.create);

bankAccountsRouter.get('/', ensureAuthenticated, bankAccountsController.list);

bankAccountsRouter.delete('/:id', ensureAuthenticated, bankAccountsController.delete);

bankAccountsRouter.get('/:id', ensureAuthenticated, bankAccountsController.findById);

export default bankAccountsRouter;
