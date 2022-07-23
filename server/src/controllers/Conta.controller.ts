import { NextFunction, Request, Response } from 'express';
import ContaService from '../services/Conta.service';
import HttpStatus from '../utils/http.status';

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { CodCliente } = req.params;
    const conta = await ContaService.getById(parseInt(CodCliente, 10));
    return res.status(HttpStatus.OK).json(conta);
  } catch (error) {
    next(error);
  }
};

const deposit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { CodCliente, Valor } = req.body;
    await ContaService.deposit(parseInt(CodCliente, 10), parseFloat(Valor));
    return res.status(HttpStatus.CREATED).end();
  } catch (error) {
    next(error);
  }
};

const withdrawal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { CodCliente, Valor } = req.body;
    await ContaService.withdrawal(parseInt(CodCliente, 10), parseFloat(Valor));
    return res.status(HttpStatus.CREATED).end();
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { CodCliente } = req.params;
    await ContaService.delete(parseInt(CodCliente, 10));
    return res.status(HttpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};

export default {
  getById,
  deposit,
  withdrawal,
  remove,
};
