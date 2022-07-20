import { ResultSetHeader, RowDataPacket } from "mysql2";
import MyConnection from "../database/MyConnection";
import IConnection from "../interfaces/connection/IConnection";
import IConta from "../interfaces/conta/IConta";

class ContaModel {
  public static async getById(conn: IConnection, id: number): Promise<IConta> {
    const [result] = await MyConnection
      .run(conn.queries.getContaById, [id]) as RowDataPacket[];
    return result as IConta;
  }

  public static async create(conn: IConnection, values: string[]): Promise<number> {
    const result = await MyConnection
      .run(conn.queries.createConta, values) as ResultSetHeader;
    return result.insertId;
  }

  public static async getByEmail(conn: IConnection, email: string): Promise<IConta> {
    const [result] = await conn
      .run(conn.queries.getContaByEmail, [email]) as RowDataPacket[];
    return result as IConta;
  }

  public static async update(conn: IConnection, values: number[]): Promise<number> {
    const result = await MyConnection
      .run(conn.queries.updateConta, values) as ResultSetHeader;
    return result.affectedRows;
  }
}

export default ContaModel;
