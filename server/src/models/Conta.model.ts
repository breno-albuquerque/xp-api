import { ResultSetHeader, RowDataPacket } from "mysql2";
import MyConnection from "../database/MyConnection";
import IConnection from "../interfaces/connection/IConnection";
import IConta from "../interfaces/conta/IConta";
import INewConta from "../interfaces/conta/INewConta";

class ContaModel {
  public static async getById(conn: IConnection, id: number): Promise<IConta> {
    console.log('here', conn.queries.getById)
    const [result] = await MyConnection.run(conn.queries.getContaById, [id]) as RowDataPacket[];
    return result as IConta;
  }

  public static async create(conn: IConnection, conta: INewConta): Promise<number> {
    const { nome, cpf, email, senha } = conta;
    const result = await MyConnection.run(conn.queries.createConta, [nome, cpf, email, senha]) as ResultSetHeader;
    return result.insertId;
  }

  public static async getByEmail(conn: IConnection, email: string): Promise<IConta> {
    const [result] = await conn.run(conn.queries.getContaByEmail, [email]) as RowDataPacket[];
    return result as IConta;
  }

  public static async update(conn: IConnection, values: number[]): Promise<number> {
    console.log(values)
    const result = await MyConnection.run(conn.queries.updateConta, values) as ResultSetHeader;
    return result.affectedRows;
  }
}

export default ContaModel;
