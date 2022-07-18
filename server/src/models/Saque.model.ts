import { ResultSetHeader } from "mysql2";
import IConnection from "../interfaces/connection/IConnection";

class Saque {
  public static async create(conn: IConnection, values: number[]): Promise<number> {
    const result = await conn.run(conn.queries.createSaque, values) as ResultSetHeader;
    return result.insertId;
  }
}

export default Saque;
