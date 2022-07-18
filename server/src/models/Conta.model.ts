import { ResultSetHeader, RowDataPacket } from "mysql2";
import MyConnection from "../database/MyConnection";
import IConta from "../interfaces/conta/IConta";
import INewConta from "../interfaces/conta/INewConta";

class ContaModel {
  public static async create(query: string, conta: INewConta): Promise<number> {
    const { email, password } = conta;
    const result = await MyConnection.run(query, [email, password]) as ResultSetHeader;
    return result.insertId;
  }

  public static async getById(query: string, id: number): Promise<IConta> {
    const [result] = await MyConnection.run(query, [id]) as RowDataPacket[];
    return result as IConta;
  }

  public static async getByEmail(query: string, email: string): Promise<IConta> {
    const [result] = await MyConnection.run(query, [email]) as RowDataPacket[];
    return result as IConta;
  }
}

export default ContaModel;
