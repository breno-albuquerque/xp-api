import MyConnection from "../database/MyConnection";
import IConta from "../interfaces/conta/IConta";
import ContaModel from "../models/Conta.model"
import DepositoModel from '../models/Deposito.model';
import SaqueModel from "../models/Saque.model";
import HttpException from "../utils/http.exception";
import HttpStatus from "../utils/http.status";

class ContaService {
  public static async getById(contaId: number): Promise<IConta> {
    const conta = await ContaModel.getById(MyConnection, contaId);
    if (!conta) throw new HttpException(HttpStatus.NOT_FOUND, 'Conta não encontrada');
    return conta;
  }

  public static async deposit(contaId: number, valor: number): Promise<void> {
    const conta = await this.getById(contaId);
    
    await DepositoModel.create(MyConnection, [contaId, valor]);
    await ContaModel.update(MyConnection, [conta.saldo + valor, contaId]);
  }

  public static async withdrawal(contaId: number, valor: number) {
    const conta = await this.getById(contaId);
    const newValue = conta.saldo - valor;
    if (newValue < 0) throw new HttpException(HttpStatus.UNPROCESSABLE, 'Valor do saque maior do que o saldo');

    await SaqueModel.create(MyConnection, [contaId, valor]);
    await ContaModel.update(MyConnection, [newValue, contaId]);
  }
}

export default ContaService;
