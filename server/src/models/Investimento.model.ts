import { ResultSetHeader, RowDataPacket } from "mysql2";
import IConnection from "../interfaces/connection/IConnection";

class InvestimentoModel {
  public static async getOne(conn: IConnection, clientId: number, assetId: number,) {
    const [result] = await conn.run(conn.queries.getOneInvestimento, [clientId, assetId]) as RowDataPacket[];
    return result;
  }

  public static async create(conn: IConnection, clientId: number, assetId: number, quantity: number) {
    const result = await conn.run(conn.queries.createInvestimento, [clientId, assetId, quantity])/*  as ResultSetHeader; */
    return result/* .insertId; */
  }

  public static async update(conn: IConnection, clientId: number, assetId: number, quantity: number) {
    const result = await conn.run(conn.queries.createInvestimento, [clientId, assetId, quantity]) as ResultSetHeader;
    return result.affectedRows;
  }

  public static async delete(conn: IConnection, clientId: number, assetId: number) {
    const result = await conn.run(conn.queries.deleteInvestimento, [clientId, assetId]) as ResultSetHeader;
    return result.affectedRows;
  }
}

export default InvestimentoModel;
