export default interface ILatestResponse {
  success: boolean;
  timestamp: number;
  base: 'USD';
  date: string;
  rates: {
    GBP: number;
    EUR: number;
    CHF: number;
    BRL: number;
    USD: number;
  };
}
