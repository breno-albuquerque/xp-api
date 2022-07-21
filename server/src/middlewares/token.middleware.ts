import { NextFunction, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import IRequest from '../interfaces/IRequest';
import HttpException from '../utils/http.exception';
import HttpStatus from '../utils/http.status';
import jwtToken from '../utils/jwt.token';

const tokenValidation = (req: IRequest, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, 'Token não encontrado');
    }

    const user = jwtToken.verifyToken(token) as JwtPayload;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    req.user! = user;

    next();
};

export default tokenValidation;
