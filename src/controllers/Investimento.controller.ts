import { NextFunction, Request, Response } from 'express';
import InvestimentoService from '../services/Investimento.service';
import HttpStatus from '../utils/http.status';

const purchase = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await InvestimentoService.purchase(req.body);
    return res.status(HttpStatus.CREATED).end();
  } catch (error) {
    next(error);
  }
};

const sale = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await InvestimentoService.sale(req.body);
    return res.status(HttpStatus.CREATED).end();
  } catch (error) {
    next(error);
  }
};

export default {
  purchase,
  sale,
};
