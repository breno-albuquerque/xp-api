import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/http.exception';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = error as HttpException;
  return res.status(status || 500).json({ message } || { message: 'Erro interno' });
};

export default errorMiddleware;
