interface IEncryptionProvider {
    encrypt(payload: string, key: string): string;
    decrypt(encrypted: string, key: string): string;
  }

export default IEncryptionProvider;
