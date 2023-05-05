import exchangeFees from '@config/exchangeFees';
import IExchangeProvider from '@shared/container/providers/ExchangeProvider/models/IExchangeProvider';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  base: 'GBP' | 'EUR' | 'CHF' | 'BRL' | 'USD';
  amount: number;
}

interface IResponse {
  base: string;
  amount: number;
  asappFees: {
    [feeName: string]: number;
  };
  rates: {
    BRL: number;
    CHF: number;
    GBP: number;
    EUR: number;
    USD: number;
  };
}

@injectable()
export default class LatestExchangeRatesService {
  constructor(
    @inject('ExchangeProvider')
    private exchangeProvider: IExchangeProvider
  ) {}

  public async execute({ base, amount }: IRequest): Promise<IResponse> {
    const chargedAmount = Object.values(exchangeFees).reduce((total, next) => {
      const partialChargedAmount = amount * next;
      return total + partialChargedAmount;
    });

    const deducedAmount = amount - chargedAmount;

    const { rates } = await this.exchangeProvider.getLatestRates();

    // converte os valores para dólar
    const amountUSD = deducedAmount / rates[base];

    const deducedRates: typeof rates = {
      BRL: amountUSD * rates.BRL,
      CHF: amountUSD * rates.CHF,
      EUR: amountUSD * rates.EUR,
      GBP: amountUSD * rates.GBP,
      USD: amountUSD
    };

    const data = {
      base,
      amount,
      asappFees: exchangeFees,
      rates: deducedRates
    };

    return data;
  }
}
