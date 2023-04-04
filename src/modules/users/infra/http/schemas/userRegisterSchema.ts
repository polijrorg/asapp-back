import { body } from 'express-validator';

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
  body('phone').isString().notEmpty(),
  body('occupation').isString().trim().notEmpty(),
  body('nationality').isString().trim().notEmpty(),
  body('pep').isBoolean(),
  body('monthly_income').isFloat(),
  body('birthDate').isISO8601().toDate().custom(validateBirthDate)
    .withMessage('You cannot create a user under 18 years old'),
];

export default userRegisterSchema;
