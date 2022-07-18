import { NextFunction, Request, Response } from 'express';
import ContaService from '../services/Conta.service';
import HttpStatus from '../utils/http.status';

const create = async (req: Request, res: Response, next: NextFunction) => {
 try {
    await ContaService.create(req.body);
    return res.status(HttpStatus.CREATED).end();
  } catch (error) {
    next(error);
  }
}

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { contaId } = req.params;
    const conta = await ContaService.getById(parseInt(contaId));
    return res.status(HttpStatus.OK).json(conta);
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  getById
}
