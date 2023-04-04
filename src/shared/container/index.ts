import { container } from 'tsyringe';

import './providers';

// Users
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/prisma/repositories/UsersRepository';
import IRefreshTokensRepository from '@modules/users/repositories/IRefreshTokensRepository';
import RefreshTokensRepository from '@modules/users/infra/prisma/repositories/RefreshTokensRepository';

// Bank Accounts
import IBankAccountsRepository from '@modules/bankAccounts/repositories/IBankAccountsRepository';
import BankAccountsRepository from '@modules/bankAccounts/infra/prisma/repositories/BankAccountsRepository';

// Documents
import IDocumentsRepository from '@modules/documents/repositories/IDocumentsRepository';
import DocumentsRepository from '@modules/documents/infra/prisma/repositories/documentsRepository';

// Contacts
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import ContactsRepository from '@modules/contacts/infra/prisma/repositories/ContactsRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IRefreshTokensRepository>('RefreshTokensRepository', RefreshTokensRepository);
container.registerSingleton<IBankAccountsRepository>('BankAccountsRepository', BankAccountsRepository);
container.registerSingleton<IDocumentsRepository>('DocumentsRepository', DocumentsRepository);
container.registerSingleton<IContactsRepository>('ContactsRepository', ContactsRepository);
