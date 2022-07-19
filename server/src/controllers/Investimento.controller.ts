import { NextFunction, Request, Response } from 'express';
import InvestimentoService from '../services/Investimento.service';
import HttpStatus from '../utils/http.status';

const buyAssets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { CodCliente, CodAtivo, QtdeAtivo  } = req.body;
    await InvestimentoService.buyAssets(CodCliente, CodAtivo, QtdeAtivo);
    return res.status(HttpStatus.CREATED).end();
  } catch (error) {
    next(error);
  }
}

const sellAssets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { CodCliente, CodAtivo, QtdeAtivo  } = req.body;
    await InvestimentoService.sellAssets(CodCliente, CodAtivo, QtdeAtivo);
    return res.status(HttpStatus.CREATED).end();
  } catch (error) {
    next(error);
  }
}

export default {
  buyAssets,
  sellAssets
}
