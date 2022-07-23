//  import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { QueryResult } from 'pg';
import IConnection from '../interfaces/IConnection';
import IInvestimento from '../interfaces/IInvestimento';

class InvestimentoModel {
    public static async getOne(conn: IConnection, invest: IInvestimento): Promise<IInvestimento> {
    const { CodCliente, CodAtivo } = invest;
    const result = await conn
      .run(conn.qInvestimento.getOne, [CodCliente, CodAtivo]) as QueryResult;
    return result.rows[0];
  }

  public static async create(conn: IConnection, investment: IInvestimento): Promise<number> {
    const { CodCliente, CodAtivo, QtdeAtivo } = investment;
    const result = await conn
      .run(conn.qInvestimento.create, [CodCliente, CodAtivo, QtdeAtivo]) as QueryResult;
    return result.rowCount;
  }

  public static async update(conn: IConnection, investment: IInvestimento): Promise<number> {
    const { CodAtivo, CodCliente, QtdeAtivo } = investment;
    const result = await conn
      .run(conn.qInvestimento.update, [QtdeAtivo, CodAtivo, CodCliente]) as QueryResult;
    return result.rowCount;
  }

  public static async delete(conn: IConnection, assetId: number, contaId: number): Promise<number> {
    const result = await conn
      .run(conn.qInvestimento.delete, [assetId, contaId]) as QueryResult;
    return result.rowCount;
  }
}

export default InvestimentoModel;
