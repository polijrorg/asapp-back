import { User } from '@prisma/client';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    token: string;
    email: string;
    newPassword: string;
}

@injectable()
export default class UpdatePasswordService {
  constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
  ) {}

  public async execute({ token, email, newPassword }: IRequest): Promise<Omit<User, 'password'>> {
    const userWithThisEmail = await this.usersRepository.findByEmailWithRelations(email) as User;
    // if (token !== userWithThisEmail?.restorePasswordToken) {
    //   throw new AppError('You cannot change password with this token')
    // }
    if (newPassword === userWithThisEmail.password) {
      throw new AppError('A nova senha deve ser diferente da senha anterior.')
    }

    const tokenMatched = await this.hashProvider.compareHash(token, userWithThisEmail.restorePasswordToken as string)

    if (!tokenMatched) throw new AppError('Incorrect Token')

    const userId = userWithThisEmail.id;

    await this.usersRepository.destroyToken(userId);

    const hashedPassword = await this.hashProvider.generateHash(newPassword);

    const user = await this.usersRepository.changePassword(userId, hashedPassword);

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
