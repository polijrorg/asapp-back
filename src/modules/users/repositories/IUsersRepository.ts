import { User } from '@prisma/client';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

interface IUsersRepository {
  findByEmailWithRelations(email: string): Promise<User | null>;
  findByEmailPhoneOrCpf(email: string, phone: string, cpf: string): Promise<User | null>;
  create(data: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | null>;
  list(): Promise<User[]>;
  delete(id: string): Promise<void>;
}

export default IUsersRepository;
