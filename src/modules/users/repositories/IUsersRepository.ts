import { User } from '@prisma/client';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

interface IUsersRepository {
  findByEmailWithRelations(email: string): Promise<User | null>;
  findByEmailPhoneOrCpf(email: string, phone: string, cpf: string): Promise<User | null>;
  findByName(name: string): Promise<User | null>;
  create(data: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | null>;
  list(): Promise<User[]>;
  delete(id: string): Promise<void>;
  update(userId: string, data: IUpdateUserDTO): Promise<User>;
  confirm(userId: string, confirmed: boolean): Promise<User>;
}

export default IUsersRepository;
