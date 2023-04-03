import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import validateRequestSchema from '@shared/infra/http/middlewares/validateRequestSchema';
import { Router } from 'express';
import ContactsController from '../controller/ContactsController';
import contactSchema from '../schemas/contactSchema';

const contactsRouter = Router();

const contactsController = new ContactsController();

contactsRouter.post('/', contactSchema, validateRequestSchema, ensureAuthenticated, contactsController.create);

contactsRouter.get('/', ensureAuthenticated, contactsController.list);

contactsRouter.delete('/:id', ensureAuthenticated, contactsController.delete);

contactsRouter.get('/:id', ensureAuthenticated, contactsController.findById);

export default contactsRouter;
