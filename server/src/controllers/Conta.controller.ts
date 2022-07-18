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

const deposit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { CodCliente, Valor } = req.body;
    await ContaService.deposit(parseInt(CodCliente), parseFloat(Valor));
    return res.status(HttpStatus.CREATED).end();
  } catch (error) {
    next(error);
  }
}

const service = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { CodCliente, Valor } = req.body;
    await ContaService.withdrawal(parseInt(CodCliente), parseFloat(Valor));
    return res.status(HttpStatus.CREATED).end();
  } catch (error) {
    next(error);
  }
}

export default {
  getById,
  deposit,
  service
}
