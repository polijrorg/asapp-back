import { container } from 'tsyringe';

import './providers';

// Users
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/prisma/repositories/UsersRepository';
import IRefreshTokensRepository from '@modules/users/repositories/IRefreshTokensRepository';
import RefreshTokensRepository from '@modules/users/infra/prisma/repositories/RefreshTokensRepository';
import IBankAccountsRepository from '@modules/bankAccounts/repositories/IBankAccountsRepository';
import BankAccountsRepository from '@modules/bankAccounts/infra/prisma/repositories/BankAccountsRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IRefreshTokensRepository>('RefreshTokensRepository', RefreshTokensRepository);
container.registerSingleton<IBankAccountsRepository>('BankAccountsRepository', BankAccountsRepository);
