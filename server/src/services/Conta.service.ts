import MyConnection from "../database/MyConnection";
import INewConta from "../interfaces/conta/INewConta";
import ContaModel from "../models/Conta.model"

const create = async (conta: INewConta) => {
  await ContaModel.create(MyConnection.queries.createConta, conta);
}

const getById = async (contaId: number) => {
  const conta = await ContaModel.getById(MyConnection.queries.getContaById, contaId);
  return conta;
}

export default {
  create,
  getById
}