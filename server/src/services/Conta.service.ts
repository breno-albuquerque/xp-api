import MyConnection from '../database/MyConnection';
import IConta from '../interfaces/conta/IConta';
import INewConta from '../interfaces/conta/INewConta';
import ContaModel from '../models/Conta.model';
import DepositoModel from '../models/Deposito.model';
import SaqueModel from '../models/Saque.model';
import HttpException from '../utils/http.exception';
import HttpStatus from '../utils/http.status';

class ContaService {
  public static async getById(accountId: number): Promise<IConta> {
    const conta = await ContaModel.getById(MyConnection, accountId);
    if (!conta) throw new HttpException(HttpStatus.NOT_FOUND, 'Conta não encontrada');
    return conta;
  }

  public static async getByEmail(email: string): Promise<IConta> {
    return ContaModel.getByEmail(MyConnection, email);
  }

  public static async create(account: INewConta): Promise<number> {
    const insertId = await ContaModel.create(MyConnection, account);
    return insertId;
  }

  public static async deposit(accountId: number, value: number): Promise<void> {
    const accountData = await this.getById(accountId);
    const newValue = Number((accountData.Saldo + value).toFixed(2));
    
    await DepositoModel.create(MyConnection, [accountId, value]);
    await ContaModel.update(MyConnection, newValue, accountId);
  }

  public static async withdrawal(accountId: number, value: number): Promise<void> {
    const accountData = await this.getById(accountId);
    const newValue = Number((accountData.Saldo - value).toFixed(2));

    if (newValue < 0) throw new HttpException(HttpStatus.CONFLICT, 'Saldo insuficiente');
    
    await SaqueModel.create(MyConnection, [accountId, value]);
    await ContaModel.update(MyConnection, newValue, accountId);
  }
}

export default ContaService;
