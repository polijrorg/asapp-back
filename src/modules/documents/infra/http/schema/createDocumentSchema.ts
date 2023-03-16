import isCpf from '@shared/utils/CpfValidator';
import isRg from '@shared/utils/RGValidator';
import { body } from 'express-validator';

const createDocumentSchema = [
  body('type').isIn(['CPF', 'RG', 'PASSPORT']),
  body('number').isString().trim().notEmpty(),
  body('number').if(body('type').equals('CPF')).custom(isCpf),
  body('number').if(body('type').equals('RG')).custom(isRg),
  body('number').if(body('type').equals('PASSPORT')).isPassportNumber(),
  body('expiration_date').isISO8601(),
  body('issuing_authority').isString().trim().notEmpty()
];

export default createDocumentSchema;
