import { ResultSetHeader, RowDataPacket } from "mysql2";
import IConnection from "../interfaces/connection/IConnection";

class InvestimentoModel {
  //public static async getOne(conn: IConnection, accountId: number, assetId: number,) {
    public static async getOne(conn: IConnection, values: number[]) {
    const [result] = await conn.run(conn.queries.getOneInvestimento, values) as RowDataPacket[];
    return result;
  }

  //public static async create(conn: IConnection, accountId: number, assetId: number, quantity: number) {
  public static async create(conn: IConnection, values: number[]) {
    const result = await conn.run(conn.queries.createInvestimento, values) as ResultSetHeader;
    return result.affectedRows;
  }

  //public static async update(conn: IConnection, accountId: number, assetId: number, quantity: number) {
  public static async update(conn: IConnection, values: number[]) {
    const result = await conn.run(conn.queries.updateInvestimento, values) as ResultSetHeader;
    return result.affectedRows;
  }

  //public static async delete(conn: IConnection, accountId: number, assetId: number) {
  public static async delete(conn: IConnection, values: number[]) {
    const result = await conn.run(conn.queries.deleteInvestimento, values) as ResultSetHeader;
    return result.affectedRows;
  }
}

export default InvestimentoModel;
