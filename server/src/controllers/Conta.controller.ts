import ContaService from '../services/Conta.service';

const create = async (req, res) => {
  const result = await ContaService.create(req.body);
  return res.status(200).json(result);
}

export {
  create
}