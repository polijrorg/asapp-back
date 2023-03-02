import isCpf from '@shared/utils/CpfValidator';
import { body } from 'express-validator';

const userRegisterSchema = [
  body('name').isString().trim().notEmpty(),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email must contain a valid email adress'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long'),
  body('phone').isString().trim().notEmpty(),
  body('occupation').isString().trim().notEmpty(),
  body('nationality').isString().trim().notEmpty(),
  body('pep').isBoolean(),
  body('monthly_income').isFloat(),
  body('birthDate').isISO8601(),
  body('cpf').isString().custom(isCpf)
];

export default userRegisterSchema;
