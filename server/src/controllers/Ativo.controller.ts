import { Request, Response, NextFunction } from 'express';
import AtivoService from '../services/Ativo.service';
import HttpStatus from '../utils/http.status';

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { CodAtivo } = req.params;
    const asset = await AtivoService.getById(parseInt(CodAtivo, 10));
    return res.status(HttpStatus.OK).json(asset);
  } catch (error) {
    next(error);
  }
};

const getByClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { CodCliente } = req.params;
    const assets = await AtivoService.getByClient(parseInt(CodCliente, 10));
    return res.status(HttpStatus.OK).json(assets);
  } catch (error) {
    next(error);
  }
};

export default {
  getById,
  getByClient,
};
