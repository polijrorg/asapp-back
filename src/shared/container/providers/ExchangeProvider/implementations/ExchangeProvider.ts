import axios, { AxiosInstance } from 'axios';
import { injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ILatestResponse from '../entities/ILatestResponse';
import IFixerError from '../entities/IFixerError';
import IExchangeProvider from '../models/IExchangeProvider';

const apiUrl = 'https://api.exchangerate.host';

@injectable()
export default class ExchangeProvider implements IExchangeProvider {
  constructor() {
    this.apiClient = axios.create({
      baseURL: apiUrl
      // params: {
      //   access_key: 'process.env.API_KEY'
      // }
    });
  }

  private apiClient: AxiosInstance;

  private handleFixerError(err: unknown): AppError {
    const fixerError = err as IFixerError;

    // eslint-disable-next-line no-console
    console.error(fixerError);

    return new AppError(
      `Linker error: ${fixerError.response.error.info}`,
      fixerError.response.error.code
    );
  }

  public async getLatestRates(): Promise<ILatestResponse> {
    try {
      const { data } = await this.apiClient.get('/latest', {
        params: {
          base: 'USD',
          symbols: 'GBP,EUR,CHF,BRL,USD'
        }
      });
      return data;
    } catch (err: unknown) {
      throw this.handleFixerError(err);
    }
  }
}
