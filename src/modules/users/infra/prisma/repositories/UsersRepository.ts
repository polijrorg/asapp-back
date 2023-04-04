import prisma from '@shared/infra/prisma/client';
import { Prisma, User } from '@prisma/client';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Prisma.UserDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.user;
  }

  public async findByEmailWithRelations(email: string): Promise<User | null> {
    const user = await this.ormRepository.findFirst({
      where: { email },
    });

    return user;
  }

  public async findByEmailorPhone(email: string, phone: string): Promise<User | null> {
    const user = await this.ormRepository.findFirst({
      where: { OR: [{ email }, { phone }] },
    });

    return user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = await this.ormRepository.create({ data });

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.ormRepository.findUnique({ where: { id } });

    return user;
  }

  public async list(): Promise<User[]> {
    const users = await this.ormRepository.findMany();

    return users;
  }

  public async delete(id: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const deletedUser = await this.ormRepository.delete({ where: { id } });
  }

  public async update(userId: string, data: IUpdateUserDTO): Promise<User> {
    const updatedUser = await this.ormRepository.update({
      where: { id: userId },
      data,
    });

    return updatedUser;
  }

  public async findByName(name: string): Promise<User | null> {
    const user = await this.ormRepository.findFirst({ where: { name } });

    return user;
  }

  public async confirm(userId: string, confirmed: boolean): Promise<User> {
    const user = await this.ormRepository.update({
      where: { id: userId },
      data: { confirmed },
    });
    return user
  }

  public async changePassword(userId: string, password: string): Promise<User> {
    const user = await this.ormRepository.update({
      where: { id: userId },
      data: { password },
    });
    return user;
  }

  public async destroyToken(userId: string): Promise<User> {
    const user = await this.ormRepository.update({
      where: { id: userId },
      data: { restorePasswordToken: null },
    });
    return user;
  }

  public async createToken(userId: string, token: string): Promise<User> {
    const user = await this.ormRepository.update({
      where: { id: userId },
      data: { restorePasswordToken: token },
    });
    return user;
  }
}
