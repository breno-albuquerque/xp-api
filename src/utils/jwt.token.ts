import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';
import { IConta } from '../interfaces/IConta';
import HttpException from './http.exception';
import HttpStatus from './http.status';

const SECRET = process.env.JWT_SECRET || 'secret';

const jwtConfig: SignOptions = {
  //  expiresIn: '15m',
  algorithm: 'HS256',
};

const generateToken = (payload: Omit<IConta, 'Senha' | 'Saldo' | 'Cpf' | 'Email'>): string => {
  const token: string = sign(payload, SECRET, jwtConfig);
  return token;
};

const verifyToken = (token: string): JwtPayload | string => {
  try {
    return verify(token, SECRET, jwtConfig);
  } catch (error) {
    throw new HttpException(HttpStatus.UNAUTHORIZED, 'Token inválido');
  }
};

export default {
  generateToken,
  verifyToken,
};
