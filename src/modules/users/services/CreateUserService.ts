import { inject, injectable } from 'tsyringe';
import path from 'path';

import { User } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import { phoneObject, ValidPhone } from '@shared/utils/PhoneValidator';

interface IRequest {
  name: string;
  email: string;
  ddd: string;
  phone: string;
  password: string;
  birthDate: Date;
  monthly_income: number;
  nationality: string;
  occupation: string;
  pep: boolean;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  public async execute({
    email,
    name,
    password,
    ddd,
    phone,
    birthDate,
    monthly_income,
    nationality,
    occupation,
    pep
  }: IRequest): Promise<Omit<User, 'password'>> {
    const userAlreadyExists = await this.usersRepository.findByEmailorPhone(
      email,
      phone
    );

    if (userAlreadyExists) {
      throw new AppError('User with same email, phone or cpf already exists');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const countryObject = phoneObject.find((country)=>(country.code == ddd))

    if (!countryObject) throw new AppError('There is no country with this ddd ');

    const countryMasks = countryObject?.mask

    console.log(countryMasks);

    if (!ValidPhone(phone, countryMasks as string[])) {
      throw new AppError('This phone is not valid in your country', 400)
    }

    const user = await this.usersRepository.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      ddd,
      phone,
      birthDate,
      monthly_income,
      nationality,
      occupation,
      pep
    });

    const templateDataFile = path.resolve(__dirname, '..', 'views', 'create_account.hbs');

    try {
      await this.mailProvider.sendMail({
        to: {
          name,
          email,
        },
        subject: 'Criação de conta',
        templateData: {
          file: templateDataFile,
          variables: { name },
        },
      });
    } catch {
      throw new AppError('You cannot create a account with this email');
    } finally {
      // eslint-disable-next-line no-console
      console.log('Email sent!');
    }

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
