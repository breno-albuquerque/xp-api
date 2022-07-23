import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import HttpException from '../utils/http.exception';
import HttpStatus from '../utils/http.status';

const transactionSchema = Joi.object({
   CodCliente: Joi.number().integer().required(),
   CodAtivo: Joi.number().integer().required(),
   QtdeAtivo: Joi.number().integer().required(),
}).messages({
  'any.required': 'O campo {{#label}} é obrigatório',
  'number.base': 'O campo {{#label}} deve ser um number',
  'number.integer': 'O campo {{#label}} deve ser um integer',
});

const investValidation = (req: Request, _res: Response, next: NextFunction) => {
    const validation = transactionSchema.validate(req.body, { convert: false });

    if (validation.error) {
      throw new HttpException(HttpStatus.BAD_REQUEST, validation.error.details[0].message);
    }
    
    next();
};

export default investValidation;
