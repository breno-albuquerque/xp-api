import ContaModel from "../models/Conta.model"

const create = async (conta: object) => {
  console.log(conta)
  const result = await ContaModel.create(conta);
  return result;
}

export default {
  create
}