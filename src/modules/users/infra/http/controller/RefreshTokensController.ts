import { Request, Response } from 'express';
import { container } from 'tsyringe';
import RefreshBearerTokenService from '@modules/users/services/RefreshBearerTokenService';

export default class RefreshTokensController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { token } = req.body;

    const refreshBearerTokenService = container.resolve(
      RefreshBearerTokenService,
    );

    const { accessToken, refreshToken } = await refreshBearerTokenService.execute(token);

    return res.json({ accessToken, refreshToken });
  }
}
