import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/Auth.service';
import HttpStatus from '../utils/http.status';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await AuthService.create(req.body);
    return res.status(HttpStatus.CREATED).json({ token });
  } catch (error) {
    next(error);
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await AuthService.login(req.body);
    return res.status(HttpStatus.OK).json({ token });
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  login
}