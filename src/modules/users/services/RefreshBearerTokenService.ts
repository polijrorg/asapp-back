import { inject, injectable } from 'tsyringe';
import { sign, verify } from 'jsonwebtoken';
import { User, UserRefreshToken } from '@prisma/client';
import authConfig from '@config/auth';
import IRefreshTokensRepository from '@modules/users/repositories/IRefreshTokensRepository';
import AppError from '@shared/errors/AppError';
import IEncryptionProvider from '@shared/container/providers/EncryptionProvider/models/IEncryptionProvider';
import encryptionConfig from '@config/encryption';
import { addDays } from 'date-fns';
import { ITokenPayload } from '@shared/infra/http/middlewares/ensureAuthenticated';
import IUsersRepository from '../repositories/IUsersRepository';

// o mesmo ITokenPayload do ensureAuthenticated (adicione um export nele para
// importá-lo aqui), mas com o email também, como foi feito no
// AuthenticateUserService
interface IRefreshTokenPayload extends ITokenPayload {
  email: string;
}

interface IResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

@injectable()
export default class RefreshBearerTokenService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,

    @inject('EncryptionProvider')
    private encryptionProvider: IEncryptionProvider,
  ) { }

  public async execute(refreshToken: string): Promise<IResponse> {
    const {
      refreshTokenSecret,
      refreshTokenExpiresIn,
      refreshTokenExpiresInDaysAmount,
      expiresIn,
      secret,
    } = authConfig.jwt;

    try {
      const { sub: userId, email } = verify(
        refreshToken,
        refreshTokenSecret,
      ) as IRefreshTokenPayload;

      const returnUser = await this.usersRepository.findById(userId);

      if (!returnUser) {
        throw new AppError('User not found');
      }

      const userRefreshTokens = await this.refreshTokensRepository.findByUserId(
        userId,
      );

      // função que descriptografa o refresh token e verifica se ele equivale ao
      // passado no body do request
      const isDecryptedTokenEqualToGivenRefreshToken = (
        value: UserRefreshToken,
      ): boolean => {
        const decryptedUserToken = this.encryptionProvider.decrypt(
          value.refreshToken,
          encryptionConfig.key,
        );

        return decryptedUserToken === refreshToken;
      };

      // devemos encontrar o refresh token que tem o refresh token passado no body
      const userRefreshToken = userRefreshTokens.find(
        isDecryptedTokenEqualToGivenRefreshToken,
      );

      if (!userRefreshToken) {
        throw new AppError('Refresh token does not exist', 404);
      }

      // caso o refresh token já tenha sido usado, isso pode significar que ele tenha
      // sido vazado (assumindo que o nosso front não guardaria um refresh token já
      // usado). Então, é mais seguro apagar todos os refresh tokens do usuário para
      // obrigá-lo a logar de novo
      if (userRefreshToken.used) {
        await this.refreshTokensRepository.deleteMany(userId);

        throw new AppError('Refresh token already used', 401);
      }

      userRefreshToken.used = true;

      await this.refreshTokensRepository.update(userRefreshToken);

      const newRefreshToken = sign({ email }, refreshTokenSecret, {
        subject: userId,
        expiresIn: refreshTokenExpiresIn,
      });

      const refreshTokenExpirationDate = addDays(
        new Date(),
        refreshTokenExpiresInDaysAmount,
      );

      const encryptedRefreshToken = this.encryptionProvider.encrypt(
        newRefreshToken,
        encryptionConfig.key,
      );

      await this.refreshTokensRepository.create({
        refreshToken: encryptedRefreshToken,
        userId,
        expirationDate: refreshTokenExpirationDate,
      });

      const accessToken = sign({}, secret, {
        subject: userId,
        expiresIn,
      });

      return {
        accessToken,
        refreshToken: newRefreshToken,
        user: returnUser,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.message) {
        throw new AppError(e.message);
      } else {
        throw new AppError('Invalid error type');
      }
    }
  }
}
