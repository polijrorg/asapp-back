import { container } from 'tsyringe';

import './providers';

// Users
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/prisma/repositories/UsersRepository';
import IRefreshTokensRepository from '@modules/users/repositories/IRefreshTokensRepository';
import RefreshTokensRepository from '@modules/users/infra/prisma/repositories/RefreshTokensRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IRefreshTokensRepository>('RefreshTokensRepository', RefreshTokensRepository);
