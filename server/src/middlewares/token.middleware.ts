import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/http.exception';
import HttpStatus from '../utils/http.status';
import jwtToken from '../utils/jwt.token';

const tokenValidation = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new HttpException(HttpStatus.BAD_REQUEST, 'Token não encontrado');
    jwtToken.verifyToken(token);
  } catch (error) {
    next(error);
  }
};

export default tokenValidation;
