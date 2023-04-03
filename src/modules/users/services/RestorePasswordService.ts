import path from'path';
import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { sign } from 'jsonwebtoken';

interface IRequest {
    email: string;
}

@injectable()
export default class RestorePasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ) {}

    public async execute({ email }: IRequest): Promise<string> {
        const user = await this.usersRepository.findByEmailWithRelations(email);

        if (!user) throw new AppError('There is no user with this email', 400);

        const name = user.name;

        const token = (Math.random()*712835298311).toFixed()

        const userId = user.id
        
        await this.usersRepository.createToken(userId, token)

        const templateDataFile = path.resolve(
            __dirname,
            '..',
            'views',
            'restore_password.hbs',
          );
        await this.mailProvider.sendMail({
            to: {
              name,
              email,
            },
            subject: 'Recuperação de Senha',
            templateData: {
              file: templateDataFile,
              variables: { name, token },
            },
        });
        return "Email sent!"

    }
}