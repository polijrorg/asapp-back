import { container } from 'tsyringe';
import CryptoJSEncryptionProvider from './implementations/CryptoJSEncryptionProvider';
import IEncryptionProvider from './models/IEncryptionProvider';

const providers = {
  'crypto-js': CryptoJSEncryptionProvider,
};

container.registerSingleton<IEncryptionProvider>(
  'EncryptionProvider',
  providers['crypto-js'],
);
