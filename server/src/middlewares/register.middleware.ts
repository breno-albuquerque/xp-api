import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import HttpException from '../utils/http.exception';
import HttpStatus from '../utils/http.status';

const registerSchema = Joi.object({
  nome: Joi.string().min(3).required(),
  cpf: Joi.string().length(11).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
}).messages({
  'any.required': 'O campo {{#label}} é obrigatório',
  'string.base': 'O campo {{#label}} deve ser uma string',
  'string.email': 'O campo {{#label}} deve possuir um email válido',
  'string.length': 'O campo {{#label}} deve possuir 11 caracteres',
  'string.min': 'O campo {{#label}} deve possuir no mínimo 6 caracteres',
});

const registerValidation = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const validation = registerSchema.validate(req.body);
    if (validation.error) {
      throw new HttpException(HttpStatus.BAD_REQUEST, validation.error.details[0].message);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default registerValidation;