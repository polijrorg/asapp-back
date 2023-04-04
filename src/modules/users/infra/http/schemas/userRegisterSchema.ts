import validateBirthDate from '@shared/utils/BirthDateValidator';
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
  body('phone').isString().notEmpty(),
  body('occupation').isString().trim().notEmpty(),
  body('nationality').isString().trim().notEmpty(),
  body('pep').isBoolean(),
  body('monthly_income').isFloat(),
  body('birthDate').isISO8601().toDate().custom(validateBirthDate)
    .withMessage('You cannot create a user under 18 years old'),
];

export default userRegisterSchema;
