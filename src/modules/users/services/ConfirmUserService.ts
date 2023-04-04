import { User } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    userId: string;
    confirmed: boolean;
}
@injectable()
export default class ConfirmUserService {
  constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId, confirmed }: IRequest): Promise<Omit<User, 'password'>> {
    const confirmedUser = await this.usersRepository.findById(userId);

    if (confirmedUser?.confirmed) throw new AppError('This account is already confirmed');

    const user = await this.usersRepository.confirm(userId, confirmed);

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
