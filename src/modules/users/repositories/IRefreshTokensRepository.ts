import { UserRefreshToken } from '@prisma/client';
import ICreateRefreshTokenDTO from '../dtos/ICreateRefreshTokenDTO';

interface IRefreshTokensRepository {
  create(data: ICreateRefreshTokenDTO): Promise<UserRefreshToken>;
  findByUserId(userId: string): Promise<UserRefreshToken[]>;
  update(data: UserRefreshToken): Promise<UserRefreshToken>;
  deleteMany(userId: string): Promise<void | undefined>;
  deleteById(id: string): Promise<void>;
}

export default IRefreshTokensRepository;
