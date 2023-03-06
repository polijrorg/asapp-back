import { container } from 'tsyringe';

import IDateProvider from './models/IDateProvider';
import DateFnsProvider from './implementations/DateFnsProvider';

const providers = {
  datefns: DateFnsProvider,
};

container.registerSingleton<IDateProvider>('DateProvider', providers.datefns);
