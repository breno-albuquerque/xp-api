import { Request, Response } from 'express';
import ContaService from '../services/Conta.service';

const create = async (req: Request, res: Response) => {
  const result = await ContaService.create(req.body);
  return res.status(200).json(result);
}

export default {
  create
}