//  import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { QueryResult } from 'pg';
import IConnection from '../interfaces/IConnection';
import { IConta, INewConta } from '../interfaces/IConta';

class ContaModel {
  public static async getById(conn: IConnection, id: number): Promise<Omit<IConta, 'Cpf' | 'Email' | 'Senha'>> {
    const result = await conn
      .run(conn.qConta.getById, [id]) as QueryResult;
    return result.rows[0];
  }

  public static async create(conn: IConnection, account: INewConta): Promise<number> {
    const { Nome, Cpf, Email, Senha } = account;
    const result = await conn
      .run(conn.qConta.create, [Nome, Cpf, Email, Senha]) as QueryResult;
     console.log('create', result);
    return result.rowCount;
  }

  public static async getByEmail(conn: IConnection, email: string): Promise<IConta> {
    const result = await conn
      .run(conn.qConta.getByEmail, [email]) as QueryResult;
    return result.rows[0];
  }

  public static async update(conn: IConnection, saldo: number, accountId: number): Promise<number> {
    const result = await conn
      .run(conn.qConta.update, [saldo, accountId]) as QueryResult;
      console.log('update', result);
    return result.rowCount;
  }

  public static async delete(conn: IConnection, accountId: number): Promise<number> {
    const result = await conn
      .run(conn.qConta.delete, [accountId]) as QueryResult;
    return result.rowCount;
  }
}

export default ContaModel;
