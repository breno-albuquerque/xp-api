/* eslint-disable @typescript-eslint/ban-types */
import { NextFunction, Request, Response } from 'express';
import IInvestimento from '../interfaces/IInvestimento';
import InvestimentoService from '../services/Investimento.service';
import HttpStatus from '../utils/http.status';

const purchase = async (req: Request<{}, {}, IInvestimento>, res: Response, next: NextFunction) => {
  try {
    await InvestimentoService.purchase(req.body);
    return res.status(HttpStatus.CREATED).end();
  } catch (error) {
    next(error);
  }
};

const sale = async (req: Request<{}, {}, IInvestimento>, res: Response, next: NextFunction) => {
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
