import MyConnection from "../database/MyConnection";
import IConta from "../interfaces/conta/IConta";
import ContaModel from "../models/Conta.model"
import DepositoModel from '../models/Deposito.model';
import SaqueModel from "../models/Saque.model";
import HttpException from "../utils/http.exception";
import HttpStatus from "../utils/http.status";

class ContaService {
  public static async getById(accountId: number): Promise<IConta> {
    const conta = await ContaModel.getById(MyConnection, accountId);
    if (!conta) throw new HttpException(HttpStatus.NOT_FOUND, 'Conta não encontrada');
    return conta;
  }

  public static async deposit(accountId: number, value: number): Promise<void> {
    const accountData = await this.getById(accountId);
    const newValue = Number((accountData.saldo + value).toFixed(2));
    
    await DepositoModel.create(MyConnection, [accountId, value]);
    await ContaModel.update(MyConnection, [newValue, accountId]);
  }

  public static async withdrawal(accountId: number, value: number) {
    const accountData = await this.getById(accountId);

    const newValue = Number((accountData.saldo - value).toFixed(2));

    if (newValue < 0) throw new HttpException(HttpStatus.UNPROCESSABLE, 'Saldo insuficiente');
    
    await SaqueModel.create(MyConnection, [accountId, value]);
    console.log('here2')
    await ContaModel.update(MyConnection, [newValue, accountId]);
  }
}

export default ContaService;
