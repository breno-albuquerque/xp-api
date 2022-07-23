//  import { ResultSetHeader } from 'mysql2';
import { QueryResult } from 'pg';
import IConnection from '../interfaces/IConnection';

class DepositoModel {
  public static async create(conn: IConnection, values: number[]): Promise<number> {
    const result = await conn.run(conn.qDeposito.create, values) as QueryResult;
    return result.rowCount;
  }
}

export default DepositoModel;
