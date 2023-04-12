import { Router } from 'express';

// Users
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';

// Bank accounts
import bankAccountsRouter from '@modules/bankAccounts/infra/http/routes/bankAccounts.routes';
import documentsRouter from '@modules/documents/infra/http/routes/documents.routes';
import contactsRouter from '@modules/contacts/infra/http/routes/contacts.routes';
import transfersRouter from '@modules/transfers/infra/http/routes/transfers.routes';

const routes = Router();

// Users
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

// Bank accounts
routes.use('/bank-accounts', bankAccountsRouter);

// Contacts
routes.use('/contacts', contactsRouter);

// Documents
routes.use('/documents', documentsRouter);

// Transfers
routes.use('/transfers', transfersRouter);

export default routes;
