import ICreateRefreshTokenDTO from '@modules/users/dtos/ICreateRefreshTokenDTO';
import IRefreshTokensRepository from '@modules/users/repositories/IRefreshTokensRepository';
import { Prisma, UserRefreshToken } from '@prisma/client';
import prisma from '@shared/infra/prisma/client';

export default class RefreshTokensRepository
implements IRefreshTokensRepository {
  private ormRepository: Prisma.UserRefreshTokenDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor() {
    this.ormRepository = prisma.userRefreshToken;
  }

  public async create({
    expirationDate,
    refreshToken,
    userId,
  }: ICreateRefreshTokenDTO): Promise<UserRefreshToken> {
    const userRefreshToken = await this.ormRepository.create({
      data: {
        expirationDate,
        refreshToken,
        userId,
      },
    });

    return userRefreshToken;
  }

  public async findByUserId(userId: string): Promise<UserRefreshToken[]> {
    const userRefreshTokens = await this.ormRepository.findMany({
      where: { userId },
    });

    return userRefreshTokens;
  }

  public async update(data: UserRefreshToken): Promise<UserRefreshToken> {
    const userRefreshToken = await this.ormRepository.update({
      where: { id: data.id },
      data,
    });

    return userRefreshToken;
  }

  public async deleteMany(userId: string): Promise<void> {
    await this.ormRepository.deleteMany({ where: { userId } });
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete({ where: { id } });
  }
}
