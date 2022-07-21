import { ResultSetHeader, RowDataPacket } from 'mysql2';
import IConnection from '../interfaces/connection/IConnection';
import IInvestimento from '../interfaces/investimento/IInvestimento';

class InvestimentoModel {
    public static async getOne(conn: IConnection, invest: IInvestimento): Promise<IInvestimento> {
    const { CodCliente, CodAtivo } = invest;
    const [result] = await conn
      .run(conn.queries.getOneInvestimento, [CodCliente, CodAtivo]) as RowDataPacket[];
    return result as IInvestimento;
  }

  public static async create(conn: IConnection, investment: IInvestimento): Promise<number> {
    const { CodCliente, CodAtivo, QtdeAtivo } = investment;
    const result = await conn
      .run(conn.queries.createInvestimento, [CodCliente, CodAtivo, QtdeAtivo]) as ResultSetHeader;
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
