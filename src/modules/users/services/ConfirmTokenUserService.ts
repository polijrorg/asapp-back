import { User } from "@prisma/client";
import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
    email: string,
    token: string
}

@injectable()
export default class ConfirmTokenService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) { }
    public async execute({ email, token }: IRequest): Promise<Boolean> {
        const user = await this.usersRepository.findByEmailWithRelations(email) as User;

        if (!user) throw new AppError('There is no user with this Email')

        const tokenMatched = await this.hashProvider.compareHash(token, user.restorePasswordToken as string)

        if (!tokenMatched) throw new AppError('Incorrect Token')

        return true
    }
}