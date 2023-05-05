import CreateTransferService from '@modules/transfers/services/CreateTransferService';
import LatestExchangeRatesService from '@modules/transfers/services/LatestExchangeRatesService';
import { Request, Response } from 'express';

import { container } from 'tsyringe';

export default class TransfersController {
  public async create(req: Request, res: Response) {
    const user_id = req.user.id;
    const { amount, contact_id } = req.body;

    const createTransfer = container.resolve(CreateTransferService);

    const transfer = await createTransfer.execute({
      user_id,
      contact_id,
      amount
    });

    res.json(transfer);
  }

  public async getRates(req: Request, res: Response) {
    const { base, amount } = req.query as {
      base: 'GBP' | 'EUR' | 'CHF' | 'BRL' | 'USD';
      amount: string;
    };

    const latestExchangeRates = container.resolve(LatestExchangeRatesService);

    const rates = await latestExchangeRates.execute({ base, amount: +amount });

    res.json(rates);
  }
}
