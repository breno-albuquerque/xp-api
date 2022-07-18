import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';
import IConta from '../interfaces/conta/IConta';
import HttpException from './http.exception';
import HttpStatus from './http.status';

const SECRET = process.env.JWT_SECRET || 'secret';

const jwtConfig: SignOptions = {
  algorithm: 'HS256',
};

const generateToken = (payload: any): string => {
  const token: string = sign(payload, SECRET, jwtConfig);
  return token;
};

const verifyToken = (token: string) => {
  try {
    const decrypted = verify(token, SECRET, jwtConfig);
    return decrypted;
  } catch (err) {
    throw new HttpException(HttpStatus.BAD_REQUEST, 'Token inválido');
  }
};

export {
  generateToken,
  verifyToken
}
