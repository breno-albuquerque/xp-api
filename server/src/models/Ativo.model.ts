import { ResultSetHeader, RowDataPacket } from "mysql2";
import IAtivo from "../interfaces/ativo/IAtivo";
import IConnection from "../interfaces/connection/IConnection";

class AtivoModel {
  public static async getById(conn: IConnection, value: number): Promise<IAtivo> {
    const [result] = await conn.run(conn.queries.getAtivoById, [value]) as RowDataPacket[];
    return result as IAtivo;
  }

  public static async update(conn: IConnection, value: number): Promise<number> {
    const result = await conn.run(conn.queries.updateAtivo, [value]) as ResultSetHeader;
    return result.affectedRows;
  }
}

export default AtivoModel;
