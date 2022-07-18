import jwt from '../utils/jwt.token';
import { NextFunction, Request, Response } from "express";
import HttpException from "../utils/http.exception";
import HttpStatus from "../utils/http.status";

const validToken = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new HttpException(HttpStatus.BAD_REQUEST, 'Token não encontrado');
    jwt.verifyToken(token);
  } catch (error) {
    next(error);
  }
}

const validFields = (req: Request, _res: Response, next: NextFunction) => {

}

export default {
  validToken
};
