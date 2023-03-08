import banks from '@config/banks';

export default function isBank(code: string): boolean {
  if (!banks.some((bank) => bank.code === +code)) {
    throw new Error('Invalid bank code');
  }
  return true;
}
