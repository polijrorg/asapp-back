import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import validateRequestSchema from '@shared/infra/http/middlewares/validateRequestSchema';
import { Router } from 'express';

import UsersController from '../controller/UsersController';
import userRegisterSchema from '../schemas/userRegisterSchema';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/register', userRegisterSchema, validateRequestSchema, usersController.create);

usersRoutes.get('/', ensureAuthenticated, userRegisterSchema, usersController.get);

usersRoutes.delete('/:id', ensureAuthenticated, usersController.delete);

usersRoutes.get('/:id', ensureAuthenticated, usersController.getUser);

usersRoutes.put('/update', ensureAuthenticated, usersController.update);

export default usersRoutes;
