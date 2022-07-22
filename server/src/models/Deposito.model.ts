import { ResultSetHeader } from 'mysql2';
import IConnection from '../interfaces/IConnection';

class DepositoModel {
  public static async create(conn: IConnection, values: number[]): Promise<number> {
    const result = await conn.run(conn.qDeposito.create, values) as ResultSetHeader;
    return result.insertId;
  }
}

export default DepositoModel;
