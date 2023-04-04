import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import validateRequestSchema from '@shared/infra/http/middlewares/validateRequestSchema';
import { Router } from 'express';

import UsersController from '../controller/UsersController';
import userRegisterSchema from '../schemas/userRegisterSchema';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/register', userRegisterSchema, validateRequestSchema, usersController.create);

usersRoutes.get('/', userRegisterSchema, usersController.get);

usersRoutes.delete('/:id', usersController.delete);

usersRoutes.get('/:id', ensureAuthenticated, usersController.getUser);

usersRoutes.put('/update', ensureAuthenticated, usersController.update);

usersRoutes.patch('/confirm/:userId', usersController.confirm);

usersRoutes.patch('/restore-password', usersController.requestTokenToRestorePassword);

usersRoutes.patch('/update-password', usersController.changePassword);

export default usersRoutes;
