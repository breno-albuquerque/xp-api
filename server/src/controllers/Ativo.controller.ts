import { Request, Response, NextFunction } from 'express';
import AtivoService from '../services/Ativo.service';
import HttpStatus from '../utils/http.status';

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { codAtivo } = req.params;
    const asset = await AtivoService.getById(parseInt(codAtivo, 10));
    return res.status(HttpStatus.OK).json(asset);
  } catch (error) {
    next(error);
  }
};

export default {
  getById,
};
