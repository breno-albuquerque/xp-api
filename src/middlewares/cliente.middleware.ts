import { NextFunction, Response } from 'express';
import IRequest from '../interfaces/IRequest';
import HttpException from '../utils/http.exception';
import HttpStatus from '../utils/http.status';

const validateBodyId = (req: IRequest, res: Response, next: NextFunction) => {
  const { CodCliente } = req.body;
  if (Number(CodCliente) !== Number(req.user?.Id)) {
    throw new HttpException(HttpStatus.UNAUTHORIZED, 'Identificador de conta incorreto');
  }
  next();
};

const validateParamId = (req: IRequest, res: Response, next: NextFunction) => {
  const { CodCliente } = req.params;
  if (Number(CodCliente) !== Number(req.user?.Id)) {
    throw new HttpException(HttpStatus.UNAUTHORIZED, 'Identificador de conta incorreto');
  }
  next();
};

export {
  validateParamId,
  validateBodyId,
};
