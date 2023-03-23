import { body } from 'express-validator';

const bankAccountSchema = [
  body('bank_name').isString().trim().notEmpty(),
  body('account_name').isString().trim().notEmpty(),
  body('agency').isNumeric().trim().notEmpty(),
  body('account').isNumeric().trim().notEmpty(),
  body('check_digit').isNumeric().trim().notEmpty(),

];

export default bankAccountSchema;
