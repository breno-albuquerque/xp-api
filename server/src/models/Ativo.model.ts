import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { IAtivo, IFullAtivo } from '../interfaces/IAtivo';
import IConnection from '../interfaces/IConnection';

class AtivoModel {
  public static async getAll(conn: IConnection): Promise<IAtivo[]> {
    const result = await conn
      .run(conn.qAtivo.getAll) as RowDataPacket;
    return result as IAtivo[];
  }

  public static async getById(conn: IConnection, id: number): Promise<IAtivo> {
    const [result] = await conn
      .run(conn.qAtivo.getById, [id]) as RowDataPacket[];
    return result as IAtivo;
  }

  public static async getByClient(conn: IConnection, clientId: number): Promise<IFullAtivo[]> {
    const result = await conn
      .run(conn.qAtivo.getByClient, [clientId]);
    return result as IFullAtivo[];
  }

  public static async update(conn: IConnection, quantity: number, id: number): Promise<number> {
    const result = await conn
      .run(conn.qAtivo.update, [quantity, id]) as ResultSetHeader;
    return result.affectedRows;
  }
}

export default AtivoModel;
