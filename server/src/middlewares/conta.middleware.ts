import jwt from '../utils/jwt.token';
import { NextFunction, Request, Response } from "express";
import HttpException from "../utils/http.exception";
import HttpStatus from "../utils/http.status";
import Joi from 'joi';

const transactionSchema = Joi.object({
   CodCliente: Joi.number().integer().required(),
   Valor: Joi.number().min(0).required()
}).messages({
  'any.required': 'O campo {{#label}} é obrigatŕio',
  'number.base': 'O campo {{#label}} deve ser um number',
  'number.integer': 'O campo {{#label}} deve ser um integer',
  'number.min': 'O campo {{#label}} não pode ser menor ou igual a 0'
});

const validTransaction = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const validation = transactionSchema.validate(req.body, { convert: false })
    if (validation.error) {
      throw new HttpException(HttpStatus.BAD_REQUEST, validation.error.details[0].message);
    }
    next();
  } catch (error) {
    next(error)
  }
}

export default {
  validTransaction
}
