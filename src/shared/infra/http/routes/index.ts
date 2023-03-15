import { Router } from 'express';

// Users
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';

// Bank accounts
import bankAccountsRouter from '@modules/bankAccounts/infra/http/routes/bankAccounts.routes';
import documentsRouter from '@modules/documents/infra/http/routes/documents.routes';

const routes = Router();

// Users
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

// Bank accounts
routes.use('/bank-accounts', bankAccountsRouter);

// Documents
routes.use('/documents', documentsRouter);

export default routes;
