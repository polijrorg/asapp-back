import { container } from 'tsyringe';
import ExchangeProvider from './implementations/ExchangeProvider';
import IExchangeProvider from './models/IExchangeProvider';

container.registerSingleton<IExchangeProvider>(
  'ExchangeProvider',
  ExchangeProvider
);
