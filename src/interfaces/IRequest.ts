import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface IRequest extends Request {
  user?: JwtPayload
}

export default IRequest;
