import { User } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    userId: string;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    nationality: string;
    monthly_income: number;
    occupation: string;
    pep: boolean;
    birthDate: Date;
}

@injectable()
export default class UpdateUserService {
  constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    userId, name, email, cpf, phone, nationality, monthly_income, occupation, pep, birthDate,
  }: IRequest): Promise<User> {
    const unchangedUser = await this.usersRepository.findById(userId);

    if (!unchangedUser) {
      throw new AppError('Invalid user Token');
    }

    const user = await this.usersRepository.update(userId, {
      name,
      email,
      cpf,
      phone,
      nationality,
      birthDate,
      monthly_income,
      occupation,
      pep,
    });

    return user;
  }
}
