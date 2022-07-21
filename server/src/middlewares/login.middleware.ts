import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import HttpException from '../utils/http.exception';
import HttpStatus from '../utils/http.status';

const loginSchema = Joi.object({
  Email: Joi.string().email().required(),
  Senha: Joi.string().min(6).required(),
}).messages({
  'any.required': 'O campo {{#label}} é obrigatório',
  'string.base': 'O campo {{#label}} deve ser uma string',
  'string.email': 'O campo {{#label}} deve possuir um email válido',
  'string.min': 'O campo {{#label}} deve possuir no mínimo 6 caracteres',
});

const loginValidation = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const validation = loginSchema.validate(req.body);
    if (validation.error) {
      throw new HttpException(HttpStatus.BAD_REQUEST, validation.error.details[0].message);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default loginValidation;