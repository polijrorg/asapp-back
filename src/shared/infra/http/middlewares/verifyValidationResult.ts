import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import AppError from '@shared/errors/AppError';

export default function verifyValidationResult(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // a função validationResult retorna os erros associados ao express-validator
  // no objeto do request
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = errors.array()[0];

    // nesse caso, só estamos lidando com um dos erros encontrados. Você pode
    // optar por retornar uma array com cada um dos erros
    throw new AppError(
      `Validation error: field ${error.param} on ${error.location} is invalid.`,
    );
  }

  return next();
}
