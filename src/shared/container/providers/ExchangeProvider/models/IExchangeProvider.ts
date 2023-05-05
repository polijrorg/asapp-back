import ILatestResponse from '../entities/ILatestResponse';

export default interface IExchangeProvider {
  getLatestRates(): Promise<ILatestResponse>;
}
