import { ResultSetHeader, RowDataPacket } from 'mysql2';
import IAtivo from '../interfaces/ativo/IAtivo';
import IConnection from '../interfaces/connection/IConnection';

class AtivoModel {
  public static async getById(conn: IConnection, id: number): Promise<IAtivo> {
    const [result] = await conn
      .run(conn.queries.getAtivoById, [id]) as RowDataPacket[];
    return result as IAtivo;
  }

  public static async getByClient(conn: IConnection, clientId: number): Promise<IAtivo[]> {
    const [result] = await conn
      .run(conn.queries.getAtivosByClient, [clientId]);
    return result as IAtivo[];
  }

  public static async update(conn: IConnection, quantity: number, id: number): Promise<number> {
    const result = await conn
      .run(conn.queries.updateAtivo, [quantity, id]) as ResultSetHeader;
    return result.affectedRows;
  }
}

export default AtivoModel;
