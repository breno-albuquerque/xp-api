import { NextFunction, Request, Response } from 'express';
import ContaService from '../services/Conta.service';
import HttpStatus from '../utils/http.status';

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { contaId } = req.params;
    const conta = await ContaService.getById(parseInt(contaId));
    return res.status(HttpStatus.OK).json(conta);
  } catch (error) {
    next(error);
  }
}

/* const deposit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ContaService.deposit(req.body);
    return res.status(201).end();
  } catch (error) {
    next(error);
  }
} */

export default {
  getById,
/*   deposit */
}
