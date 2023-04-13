import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { omit } from 'underscore';
import ILinkerProvider from '@shared/container/providers/LinkerProvider/models/ILinkerProvider';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class ListUserService {
  constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<Omit<User, 'password'>[]> {
    
    const users = await this.usersRepository.list();
    return users.map((user) => omit(user, 'password'));
  }
}
