//  import MyConnection from '../database/connections/MyConnection';
import PgConnection from '../database/connections/PgConnection';
import IConnection from '../interfaces/IConnection';
import { IConta, INewConta } from '../interfaces/IConta';
import ContaModel from '../models/Conta.model';
import DepositoModel from '../models/Deposito.model';
import SaqueModel from '../models/Saque.model';
import HttpException from '../utils/http.exception';
import HttpStatus from '../utils/http.status';

class ContaService {
  static conn: IConnection = PgConnection;

  public static async getById(accountId: number): Promise<Omit<IConta, 'Cpf' | 'Email' | 'Senha'>> {
    const conta = await ContaModel.getById(this.conn, accountId);
    if (!conta) throw new HttpException(HttpStatus.NOT_FOUND, 'Conta não encontrada');
    return conta;
  }

  public static async getByEmail(email: string): Promise<IConta> {
    const conta = await ContaModel.getByEmail(this.conn, email);
    return conta;
  }

  public static async create(account: INewConta): Promise<number> {
    const rowCount = await ContaModel.create(this.conn, account);
    return rowCount;
  }

  public static async deposit(accountId: number, value: number): Promise<void> {
    const accountData = await this.getById(accountId);
    const newValue = Number((accountData.Saldo + value).toFixed(2));
    
    await DepositoModel.create(this.conn, [accountId, value]);
    await ContaModel.update(this.conn, newValue, accountId);
  }

  public static async withdrawal(accountId: number, value: number): Promise<void> {
    const accountData = await this.getById(accountId);
    const newValue = Number((accountData.Saldo - value).toFixed(2));

    if (newValue < 0) throw new HttpException(HttpStatus.CONFLICT, 'Saldo insuficiente');
    
    await SaqueModel.create(this.conn, [accountId, value]);
    await ContaModel.update(this.conn, newValue, accountId);
  }

  public static async delete(accountId: number): Promise<void> {
    const rows = await ContaModel.delete(this.conn, accountId);
    if (!rows) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Conta não encontrada');
    }
  }
}

export default ContaService;
