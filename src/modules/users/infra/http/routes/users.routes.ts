import validateRequestSchema from '@shared/infra/http/middlewares/validateRequestSchema';
import { Router } from 'express';

import UsersController from '../controller/UsersController';
import userRegisterSchema from '../schemas/userRegisterSchema';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/register', userRegisterSchema, validateRequestSchema, usersController.create);

usersRoutes.get('/', userRegisterSchema, usersController.get);

usersRoutes.delete('/:id', usersController.delete);

usersRoutes.get('/:id', usersController.getUser);

export default usersRoutes;
