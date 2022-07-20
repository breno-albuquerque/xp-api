import { ResultSetHeader, RowDataPacket } from "mysql2";
import IConnection from "../interfaces/connection/IConnection";
import IInvestimento from "../interfaces/investimento/IInvestimento";

class InvestimentoModel {
  //public static async getOne(conn: IConnection, accountId: number, assetId: number,) {
    public static async getOne(conn: IConnection, investment:IInvestimento) {
    const { CodAtivo, CodCliente } = investment;
    const [result] = await conn
      .run(conn.queries.getOneInvestimento, [CodAtivo, CodCliente]) as RowDataPacket[];
    return result;
  }

  //public static async create(conn: IConnection, accountId: number, assetId: number, quantity: number) {
  public static async create(conn: IConnection, investment: IInvestimento) {
    const { CodAtivo, CodCliente, QtdeAtivo } = investment;
    const result = await conn
      .run(conn.queries.createInvestimento, [CodAtivo, CodCliente, QtdeAtivo]) as ResultSetHeader;
    return result.affectedRows;
  }

  //public static async update(conn: IConnection, accountId: number, assetId: number, quantity: number) {
  public static async update(conn: IConnection, investment: IInvestimento) {
    const { CodAtivo, CodCliente, QtdeAtivo } = investment
    const result = await conn
      .run(conn.queries.updateInvestimento, [QtdeAtivo, CodAtivo, CodCliente]) as ResultSetHeader;
    return result.affectedRows;
  }

  //public static async delete(conn: IConnection, accountId: number, assetId: number) {
  public static async delete(conn: IConnection, values: number[]) {
    const result = await conn
      .run(conn.queries.deleteInvestimento, values) as ResultSetHeader;
    return result.affectedRows;
  }
}

export default InvestimentoModel;
