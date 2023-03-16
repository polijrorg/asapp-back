import isCpf from '@shared/utils/CpfValidator';
import { body } from 'express-validator';

function validatePhone(phone: string) {
  const regex = new RegExp('^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$');
  return regex.test(phone);
}

function validateBirthDate(birthDate: Date) {
  const hoje = new Date();
  const nasc = new Date(birthDate);
  const idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (idade >= 18) {
    if (idade === 18 && m > 0) return true;
    return true;
  }
  return false;
}

const userRegisterSchema = [
  body('name').isString().trim().notEmpty(),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email must contain a valid email adress'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long'),
  body('phone').isString().notEmpty().custom(validatePhone),
  body('occupation').isString().trim().notEmpty(),
  body('nationality').isString().trim().notEmpty(),
  body('pep').isBoolean(),
  body('monthly_income').isFloat(),
  body('birthDate').isISO8601().toDate().custom(validateBirthDate)
    .withMessage('You cannot create a user under 18 years old'),
  body('cpf').isString().custom(isCpf)
];

export default userRegisterSchema;
