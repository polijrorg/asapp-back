import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest{
    id: string;
}
@injectable()
export default class DeleteUserService {
  constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const userWithThisId = await this.userRepository.findById(id);
    if (!userWithThisId) {
      throw new AppError('There is no user with this id');
    }
    await this.userRepository.delete(id);
  }
}
