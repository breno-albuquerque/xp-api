/* eslint-disable @typescript-eslint/ban-types */
import { NextFunction, Request, Response } from 'express';
import { INewConta } from '../interfaces/IConta';
import AuthService from '../services/Auth.service';
import HttpStatus from '../utils/http.status';

const register = async (req: Request<{}, {}, INewConta>, res: Response, next: NextFunction) => {
  try {
    const insertId = await AuthService.register(req.body);
    return res.status(HttpStatus.CREATED).json({ CodCliente: insertId });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await AuthService.login(req.body);
    return res.status(HttpStatus.OK).json({ token });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
};
