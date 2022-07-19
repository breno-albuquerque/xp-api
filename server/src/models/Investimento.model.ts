import { ResultSetHeader, RowDataPacket } from "mysql2";
import IConnection from "../interfaces/connection/IConnection";

class InvestimentoModel {
  public static async getOne(conn: IConnection, accountId: number, assetId: number,) {
    const [result] = await conn.run(conn.queries.getOneInvestimento, [accountId, assetId]) as RowDataPacket[];
    return result;
  }

  public static async create(conn: IConnection, accountId: number, assetId: number, quantity: number) {
    const result = await conn.run(conn.queries.createInvestimento, [accountId, assetId, quantity])/*  as ResultSetHeader; */
    return result/* .insertId; */
  }

  public static async update(conn: IConnection, accountId: number, assetId: number, quantity: number) {
    const result = await conn.run(conn.queries.updateInvestimento, [quantity, assetId, accountId]) as ResultSetHeader;
    return result.affectedRows;
  }

  public static async delete(conn: IConnection, accountId: number, assetId: number) {
    const result = await conn.run(conn.queries.deleteInvestimento, [accountId, assetId]) as ResultSetHeader;
    return result.affectedRows;
  }
}

export default InvestimentoModel;
