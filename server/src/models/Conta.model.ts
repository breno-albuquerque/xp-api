import {  RowDataPacket } from "mysql2";
import MyConnection from "../database/MyConnection";
import IConta from "../interfaces/conta/IConta";

class ContaModel {
  public static async getById(query: string, id: number): Promise<IConta> {
    const [result] = await MyConnection.run(query, [id]) as RowDataPacket[];
    return result as IConta;
  }

/*   public static async deposit(query: string, values: INewDeposito): Promise<number> {
    const { contaId, valor } = values;
    const result = await MyConnection.run(query, [contaId, valor]) as ResultSetHeader;
    return result.affectedRows;
  } */
}

export default ContaModel;
