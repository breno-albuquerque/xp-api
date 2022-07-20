import { ResultSetHeader, RowDataPacket } from 'mysql2';
import IConnection from '../interfaces/connection/IConnection';
import IInvestimento from '../interfaces/investimento/IInvestimento';

class InvestimentoModel {
    public static async getOne(conn: IConnection, invest: IInvestimento): Promise<IInvestimento> {
    const { CodAtivo, CodCliente } = invest;
    const [result] = await conn
      .run(conn.queries.getOneInvestimento, [CodAtivo, CodCliente]) as RowDataPacket[];
    return result as IInvestimento;
  }

  public static async create(conn: IConnection, investment: IInvestimento): Promise<number> {
    const { CodAtivo, CodCliente, QtdeAtivo } = investment;
    const result = await conn
      .run(conn.queries.createInvestimento, [CodAtivo, CodCliente, QtdeAtivo]) as ResultSetHeader;
    return result.insertId;
  }

  public static async update(conn: IConnection, investment: IInvestimento): Promise<number> {
    const { CodAtivo, CodCliente, QtdeAtivo } = investment;
    const result = await conn
      .run(conn.queries.updateInvestimento, [QtdeAtivo, CodAtivo, CodCliente]) as ResultSetHeader;
    return result.affectedRows;
  }

  public static async delete(conn: IConnection, assetId: number, contaId: number): Promise<number> {
    const result = await conn
      .run(conn.queries.deleteInvestimento, [assetId, contaId]) as ResultSetHeader;
    return result.affectedRows;
  }
}

export default InvestimentoModel;
