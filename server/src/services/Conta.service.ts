import MyConnection from "../database/MyConnection";
import IConta from "../interfaces/conta/IConta";
import INewConta from "../interfaces/conta/INewConta";
import ContaModel from "../models/Conta.model"
import HttpException from "../utils/http.exception";
import HttpStatus from "../utils/http.status";

class ContaService {
  public static async create(conta: INewConta): Promise<void>  {
    //  Verifica se email ja está registrado:
    const isRegistered = await ContaModel.getByEmail(MyConnection.queries.getContaByEmail, conta.email);
    if (isRegistered) throw new HttpException(HttpStatus.CONFLICT, 'Esse email não está disponível');

    await ContaModel.create(MyConnection.queries.createConta, conta);
  }
  
  public static async getById(contaId: number): Promise<IConta> {
    const conta = await ContaModel.getById(MyConnection.queries.getContaById, contaId);
    return conta;
  }
}

export default ContaService;
