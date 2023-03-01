import { inject, injectable } from 'tsyringe';

import { User } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  birthDate: Date;
  monthly_income: number;
  nationality: string;
  occupation: string;
  pep: boolean
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  public async execute({
    cpf, email, name, password, phone, birthDate, monthly_income, nationality, occupation, pep,
  }: IRequest): Promise<Omit<User, 'password'>> {
    const userAlreadyExists = await this.usersRepository.findByEmailPhoneOrCpf(email, phone, cpf);

    if (userAlreadyExists) throw new AppError('User with same email, phone or cpf already exists');

    const hashedPassword = await this.hashProvider.generateHash(password);

    if (!cpf) throw new AppError('You cannot create a user without a cpf');

    if (!email) throw new AppError('You cannot create a user without an email');

    if (!name) throw new AppError('You cannot create a user without a name');

    if (!password) throw new AppError('You cannot create a user without a password');

    if (!phone) throw new AppError('You cannot create a user without a phone');

    if (!birthDate) throw new AppError('You cannot create a user without a birthdate');

    if (!monthly_income) throw new AppError('You cannot create a user without a monthly income');

    if (!nationality) throw new AppError('You cannot create a user without a nationality');

    if (!occupation) throw new AppError('You cannot create a user without an occupation');

    const user = await this.usersRepository.create({
      name,
      email: email.toLowerCase(),
      cpf,
      password: hashedPassword,
      phone,
      birthDate,
      monthly_income,
      nationality,
      occupation,
      pep,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
