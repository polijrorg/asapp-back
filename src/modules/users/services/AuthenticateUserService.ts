import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import { User } from '@prisma/client';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IDateProvider from '@shared/container/providers/DateProvider/models/IDateProvider';
import IEncryptionProvider from '@shared/container/providers/EncryptionProvider/models/IEncryptionProvider';
import encryptionConfig from '@config/encryption';
import IUsersRepository from '../repositories/IUsersRepository';
import IRefreshTokensRepository from '../repositories/IRefreshTokensRepository';

interface IRequest {
  email: string;
  password: string;
}

// agora devemos ter o accessToken e o refreshToken na resposta:
interface IResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('EncryptionProvider')
    private encryptionProvider: IEncryptionProvider,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmailWithRelations(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const {
      secret,
      expiresIn,
      refreshTokenSecret,
      refreshTokenExpiresIn,
      refreshTokenExpiresInDaysAmount,
    } = authConfig.jwt;

    // devemos deletar todos os refresh tokens existentes do usuário para evitar
    // que logins antigos obtenham novos tokens
    // await this.refreshTokensRepository.deleteMany(user.id);

    const refreshToken = sign({ email }, refreshTokenSecret, {
      subject: user.id,
      expiresIn: refreshTokenExpiresIn,
    });

    const refreshTokenExpirationDate = this.dateProvider.addDays(
      new Date(),
      // aqui usamoes esse campo
      refreshTokenExpiresInDaysAmount,
    );

    // criptografia do refresh token
    const encryptedRefreshToken = this.encryptionProvider.encrypt(
      refreshToken,
      encryptionConfig.key,
    );

    await this.refreshTokensRepository.create({
      refreshToken: encryptedRefreshToken,
      userId: user.id,
      expirationDate: refreshTokenExpirationDate,
    });

    const accessToken = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}
