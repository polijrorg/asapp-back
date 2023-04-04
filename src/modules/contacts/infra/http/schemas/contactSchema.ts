import { body } from 'express-validator';

const contactSchema = [
  body('country').isString().trim().notEmpty().isIn(['BR','US', 'UK', 'CH', 'IT']),
  body('bank_name').isString().trim().notEmpty(),
  body('contact_name').isString().trim().notEmpty(),
  body('agency').isNumeric().trim().notEmpty(),
  body('account').isNumeric().trim().notEmpty(),
  body('document').isString()
];

export default contactSchema;
