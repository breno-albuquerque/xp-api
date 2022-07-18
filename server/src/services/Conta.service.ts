import MyConnection from "../database/MyConnection";
import IConta from "../interfaces/conta/IConta";
import ContaModel from "../models/Conta.model"
import DepositoModel from '../models/Deposito.model';
import HttpException from "../utils/http.exception";
import HttpStatus from "../utils/http.status";

class ContaService {
  public static async getById(contaId: number): Promise<IConta> {
    const conta = await ContaModel.getById(MyConnection, contaId);
    if (!conta) throw new HttpException(HttpStatus.NOT_FOUND, 'Conta não encontrada');
    return conta;
  }

  public static async deposit(contaId: number, valor: number): Promise<void> {
    console.log(contaId, valor)
    const conta = await this.getById(contaId);
    console.log(conta.saldo)
    await DepositoModel.create(MyConnection, [contaId, valor]);
    console.log('aqui', conta.saldo + valor, contaId)
    await ContaModel.update(MyConnection, [conta.saldo + valor, contaId]);
  }
}

export default ContaService;
