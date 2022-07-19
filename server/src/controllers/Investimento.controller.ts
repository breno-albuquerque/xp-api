import { NextFunction, Request, Response } from 'express';
import InvestimentoService from '../services/Investimento.service';
import HttpStatus from '../utils/http.status';

const buyAssets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { codCliente, codAtivo, qtdeAtivo  } = req.body;
    await InvestimentoService.buyAssets(codCliente, codAtivo, qtdeAtivo);
    return res.status(HttpStatus.CREATED).end();
  } catch (error) {
    next(error);
  }
}

export default {
  buyAssets
}
