import CreateTransferService from '@modules/transfers/services/CreateTransferService';
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
}
