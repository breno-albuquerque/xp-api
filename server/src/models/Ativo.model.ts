import { RowDataPacket } from "mysql2";
import IAtivo from "../interfaces/ativo/IAtivo";
import IConnection from "../interfaces/connection/IConnection";

class AtivoModel {
  public static async getById(conn: IConnection, value: number): Promise<IAtivo> {
    const [result] = await conn.run(conn.queries.getAtivoById, [value]) as RowDataPacket[];
    return result as IAtivo;
  }
}

export default AtivoModel;
