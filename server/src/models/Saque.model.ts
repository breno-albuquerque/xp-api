import { ResultSetHeader } from 'mysql2';
import IConnection from '../interfaces/IConnection';

class SaqueModel {
  public static async create(conn: IConnection, values: number[]): Promise<number> {
    const result = await conn.run(conn.qSaque.create, values) as ResultSetHeader;
    return result.insertId;
  }
}

export default SaqueModel;
