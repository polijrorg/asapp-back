import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import verifyValidationResult from '@shared/infra/http/middlewares/verifyValidationResult';
import { Router } from 'express';
import { query } from 'express-validator';
import RefreshTokensController from '../controller/RefreshTokensController';

import SessionsController from '../controller/SessionsController';

const sessionsRouter = Router();

const sessionsController = new SessionsController();

const refreshTokensController = new RefreshTokensController();

sessionsRouter.post('/login', sessionsController.create);

sessionsRouter.post('/refresh-token', refreshTokensController.create);

// ...
sessionsRouter.delete(
  '/logout',
  ensureAuthenticated,
  query('refreshToken').isString().isLength({ min: 1 }),
  verifyValidationResult,
  sessionsController.delete,
);
// ...

export default sessionsRouter;
