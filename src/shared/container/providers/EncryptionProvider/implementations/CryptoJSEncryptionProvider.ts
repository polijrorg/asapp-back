import { AES, enc } from 'crypto-js';
import IEncryptionProvider from '../models/IEncryptionProvider';

export default class CryptoJSEncryptionProvider implements IEncryptionProvider {
  public encrypt(payload: string, key: string): string {
    return AES.encrypt(payload, key).toString();
  }

  public decrypt(encrypted: string, key: string): string {
    return AES.decrypt(encrypted, key).toString(enc.Utf8);
  }
}
