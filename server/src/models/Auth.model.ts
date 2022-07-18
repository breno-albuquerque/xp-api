import { ResultSetHeader, RowDataPacket } from "mysql2";
import MyConnection from "../database/MyConnection";
import IConta from "../interfaces/conta/IConta";
import INewConta from "../interfaces/conta/INewConta";

class AuthModel {
  public static async create(query: string, conta: INewConta): Promise<number> {
    const { nome, cpf, email, senha } = conta;
    const result = await MyConnection.run(query, [nome, cpf, email, senha]) as ResultSetHeader;
    return result.insertId;
  }

  public static async getByEmail(query: string, email: string): Promise<IConta> {
    const [result] = await MyConnection.run(query, [email]) as RowDataPacket[];
    return result as IConta;
  }
}

export default AuthModel;
