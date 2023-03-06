import encryptionConfig from '@config/encryption';
import IEncryptionProvider from '@shared/container/providers/EncryptionProvider/models/IEncryptionProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IRefreshTokensRepository from '../repositories/IRefreshTokensRepository';

@injectable()
export default class LogUserOutService {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,

    @inject('EncryptionProvider')
    private encryptionProvider: IEncryptionProvider,
  ) {}

  public async execute(userId: string, refreshToken: string): Promise<void> {
    const userRefreshTokens = await this.refreshTokensRepository.findByUserId(
      userId,
    );

    let refreshTokenId: string | null = null;

    // achamos o refresh token que descriptografado é igual ao passado no body
    userRefreshTokens.forEach((token) => {
      if (
        refreshToken
        === this.encryptionProvider.decrypt(
          token.refreshToken,
          encryptionConfig.key,
        )
      ) {
        refreshTokenId = token.id;
      }
    });

    if (!refreshTokenId) {
      throw new AppError('Refresh token not found', 404);
    }

    await this.refreshTokensRepository.deleteById(refreshTokenId);
  }
}
