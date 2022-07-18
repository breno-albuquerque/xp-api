import MyConnection from "../database/MyConnection";
import IConta from "../interfaces/conta/IConta";
import ContaModel from "../models/Conta.model"
import HttpException from "../utils/http.exception";
import HttpStatus from "../utils/http.status";

class ContaService {
  public static async getById(contaId: number): Promise<IConta> {
    const conta = await ContaModel.getById(MyConnection, contaId);
    if (!conta) throw new HttpException(HttpStatus.NOT_FOUND, 'Conta não encontrada');
    return conta;
  }

  public static async update(contaId: number, valor: number) {
    const conta = await ContaModel.getById(MyConnection, contaId);
    const newValue = conta.saldo + valor;
    const result = await ContaModel.update(MyConnection, [newValue, contaId]);
    return result;
  }
}

export default ContaService;
