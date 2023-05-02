import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListUserService from '@modules/users/services/ListUsersService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import FindUserByIdService from '@modules/users/services/FindUserByIdService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import ConfirmUserService from '@modules/users/services/ConfirmUserService';
import RestorePasswordService from '@modules/users/services/RestorePasswordService';
import UpdatePasswordService from '@modules/users/services/UpdatePasswordService';
import ConfirmTokenService from '@modules/users/services/ConfirmTokenUserService';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      ddd,
      phone,
      password,
      nationality,
      monthly_income,
      occupation,
      birthDate,
      pep
    } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      ddd,
      phone,
      password,
      birthDate,
      monthly_income,
      nationality,
      occupation,
      pep
    });

    return res.status(201).json(user);
  }

  public async get(req: Request, res: Response): Promise<Response> {
    const listUserService = container.resolve(ListUserService);

    const users = await listUserService.execute();

    return res.json(users);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteUserService = container.resolve(DeleteUserService);
    await deleteUserService.execute({ id });
    return res.json({});
  }

  public async getUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const findByIdService = container.resolve(FindUserByIdService);
    const user = await findByIdService.execute({ id });
    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const {
      name,
      email,
      ddd,
      phone,
      birthDate,
      monthly_income,
      nationality,
      occupation,
      pep
    } = req.body;

    const updatedUser = container.resolve(UpdateUserService);

    const user = await updatedUser.execute({
      userId,
      name,
      email,
      ddd,
      phone,
      birthDate,
      monthly_income,
      nationality,
      occupation,
      pep,
    });
    return res.json(user);
  }

  public async confirm(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;
    const confirmed = true;

    const confirmedUser = container.resolve(ConfirmUserService);

    const user = await confirmedUser.execute({
      userId,
      confirmed,
    })
    return res.status(200).json(user)
  }

  public async requestTokenToRestorePassword(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const requestToken = container.resolve(RestorePasswordService);

    await requestToken.execute({ email });

    return res.status(200).json({ message: 'email sent!' })
  }

  public async checkToken(req: Request, res: Response): Promise<Response> {
    const { email, token } = req.body

    const checkToken = container.resolve(ConfirmTokenService);

    const status = await checkToken.execute({email, token});

    return res.status(200).json(status)
  }

  public async changePassword(req:Request, res: Response): Promise<Response> {
    const { email, newPassword } = req.body;

    const changePassword = container.resolve(UpdatePasswordService);

    const user = await changePassword.execute({ email, newPassword });

    return res.status(200).json(user);
  }
}
