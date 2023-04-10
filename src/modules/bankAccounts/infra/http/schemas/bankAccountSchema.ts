import isCpf from '@shared/utils/CpfValidator';
import { body } from 'express-validator';

const bankAccountSchema = [
  body('bank_name').isString().trim().notEmpty(),
  body('beneficiary_name').isString().trim().notEmpty(),
  body('agency').isNumeric().trim().notEmpty(),
  body('account').isNumeric().trim().notEmpty(),
  body('check_digit').isNumeric().trim().notEmpty(),
  body('cpf').isString().trim().custom(isCpf)
];

export default bankAccountSchema;
