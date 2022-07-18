import { NextFunction, Request, Response } from 'express';
import ContaService from '../services/Conta.service';

const create = async (req: Request, res: Response, next: NextFunction) => {
 try {
    await ContaService.create(req.body);
    return res.status(201).end();
  } catch (error) {
    next(error);
  }
}

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { contaId } = req.params;
    const conta = await ContaService.getById(parseInt(contaId));
    return res.status(200).json(conta);
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  getById
}
