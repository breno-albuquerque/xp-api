import MyConnection from "../database/MyConnection";
import INewConta from "../interfaces/conta/INewConta";
import ContaModel from "../models/Conta.model"

const create = async (conta: INewConta) => {
  await ContaModel.create(MyConnection.queries.createConta, conta);
}

export default {
  create
}