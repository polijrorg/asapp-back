import CreateBankAccountService from '@modules/bankAccounts/services/CreateBankAccountService';
import DeleteBankAccountService from '@modules/bankAccounts/services/DeleteBankAccountService';
import FindBankAccountByIdService from '@modules/bankAccounts/services/FindBankAccountByIdService';
import ListBankAccountsService from '@modules/bankAccounts/services/ListBankAccountsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class BankAccountsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      bank_code, agency, account, check_digit
    } = req.body;

    const user_id = req.user.id;

    const createBankAccount = container.resolve(CreateBankAccountService);

    const bankAccount = await createBankAccount.execute({
      bank_code,
      agency,
      account,
      check_digit,
      user_id
    });

    return res.status(201).json(bankAccount);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listBankAccounts = container.resolve(ListBankAccountsService);

    const bankAccounts = await listBankAccounts.execute({ id: user_id });

    return res.status(201).json(bankAccounts);
  }

  public async findById(req: Request, res:Response) : Promise<Response> {
    const { id } = req.params;

    const findBankAccountById = container.resolve(FindBankAccountByIdService);

    const bankAccount = await findBankAccountById.execute({ id });

    return res.status(201).json(bankAccount);
  }

  public async delete(req: Request, res: Response) : Promise<Response> {
    const { id } = req.params;

    const user_id = req.user.id;

    const deleteBankAccount = container.resolve(DeleteBankAccountService);

    await deleteBankAccount.execute({ id, user_id });

    return res.status(201).json({});
  }
}
