import isBank from '@shared/utils/BankCodeValidator';
import { body } from 'express-validator';

const bankAccountSchema = [
  body('bank_code').isNumeric().trim().notEmpty()
    .custom(isBank),
  body('agency').isNumeric().trim().notEmpty(),
  body('account').isNumeric().trim().notEmpty(),
  body('check_digit').isNumeric().trim().notEmpty(),

];

export default bankAccountSchema;
