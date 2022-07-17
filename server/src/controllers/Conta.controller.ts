import { Request, Response } from 'express';
import ContaService from '../services/Conta.service';

const create = async (req: Request, res: Response) => {
  await ContaService.create(req.body);

  return res.status(201).end();
}

export default {
  create
}
 