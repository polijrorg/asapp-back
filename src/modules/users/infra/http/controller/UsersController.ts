import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListUserService from '@modules/users/services/ListUsersService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import FindUserByIdService from '@modules/users/services/FindUserByIdService';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      cpf,
      phone,
      password,
      nationality,
      monthly_income,
      occupation,
      birthDate,
      pep,
    } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      cpf,
      phone,
      password,
      birthDate: new Date(birthDate),
      monthly_income,
      nationality,
      occupation,
      pep,
    });

    return res.status(201).json(user);
  }

  public async get(req: Request, res:Response): Promise<Response> {
    const listUserService = container.resolve(ListUserService);

    const users = await listUserService.execute();

    return res.json(users);
  }

  public async delete(req:Request, res:Response): Promise<Response> {
    const { id } = req.params;
    const deleteUserService = container.resolve(DeleteUserService);
    await deleteUserService.execute({ id });
    return res.json({});
  }

  public async getUser(req: Request, res:Response): Promise<Response> {
    const { id } = req.params;
    const findByIdService = container.resolve(FindUserByIdService);
    const user = await findByIdService.execute({ id });
    return res.json(user);
  }
}
