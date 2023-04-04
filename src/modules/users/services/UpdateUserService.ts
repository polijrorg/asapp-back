import { User } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { phoneObject, ValidPhone } from '@shared/utils/PhoneValidator';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    userId: string;
    name: string;
    email: string;
    ddd: string;
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
    userId, name, email, ddd, phone, nationality, monthly_income, occupation, pep, birthDate,
  }: IRequest): Promise<Omit<User, 'password'>> {
    const unchangedUser = await this.usersRepository.findById(userId);

    if (!unchangedUser) {
      throw new AppError('Invalid user Token');
    }

    if (ddd || phone) {
      const countryObject = phoneObject.find((country) => (country.code === ddd))

      if (!countryObject) throw new AppError('There is no country with this ddd ');

      const countryMasks = countryObject?.mask

      if (!ValidPhone(phone, countryMasks as string[])) {
        throw new AppError('This phone is not valid in your country', 400)
      }
    }

    const user = await this.usersRepository.update(userId, {
      name,
      email,
      ddd,
      phone,
      nationality,
      birthDate,
      monthly_income,
      occupation,
      pep,
    });

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
