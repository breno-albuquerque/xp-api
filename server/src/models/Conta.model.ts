import { ResultSetHeader, RowDataPacket } from 'mysql2';
import MyConnection from '../database/connections/MyConnection';
import IConnection from '../interfaces/IConnection';
import { IConta, INewConta } from '../interfaces/IConta';

class ContaModel {
  public static async getById(conn: IConnection, id: number): Promise<Omit<IConta, 'Cpf' | 'Email' | 'Senha'>> {
    const [result] = await MyConnection
      .run(conn.qConta.getById, [id]) as RowDataPacket[];
    return result as IConta;
  }

  public static async create(conn: IConnection, account: INewConta): Promise<number> {
    const { Nome, Cpf, Email, Senha } = account;
    const result = await MyConnection
      .run(conn.qConta.create, [Nome, Cpf, Email, Senha]) as ResultSetHeader;
    return result.insertId;
  }

  public static async getByEmail(conn: IConnection, email: string): Promise<IConta> {
    const [result] = await conn
      .run(conn.qConta.getByEmail, [email]) as RowDataPacket[];
    return result as IConta;
  }

  public static async update(conn: IConnection, saldo: number, accountId: number): Promise<number> {
    const result = await MyConnection
      .run(conn.qConta.update, [saldo, accountId]) as ResultSetHeader;
    return result.affectedRows;
  }

  public static async delete(conn: IConnection, accountId: number): Promise<number> {
    const result = await MyConnection
      .run(conn.qConta.delete, [accountId]) as ResultSetHeader;
    return result.affectedRows;
  }
}

export default ContaModel;
