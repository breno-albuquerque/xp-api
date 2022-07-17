import ContaModel from "../models/Conta.model"

const create = async (conta) => {
  const result = await ContaModel.create(conta);
  return result;
}

export {
  create
}