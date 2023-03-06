import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import LogUserOutService from '@modules/users/services/LogUserOutService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, accessToken, refreshToken } = await authenticateUser.execute({
      email,
      password,
    });

    const { password: _, ...userWithoutPassword } = user;

    return res.json({ user: userWithoutPassword, accessToken, refreshToken });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { refreshToken } = req.query;

    const logUserOutService = container.resolve(LogUserOutService);
    await logUserOutService.execute(id, refreshToken as string);

    return res.json({ success: true });
  }
}
