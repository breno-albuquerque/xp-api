import mysql from 'mysql2/promise';
import IConnection from './interfaces/IConnection';

type QueryVariable = string | number;

class MyConnection implements IConnection {
  public queries: any;

  private connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });

  public async run(query: string, values?: QueryVariable[]): Promise<any> {
     const [result] = await this.connection.execute(query, values);
     return result;
  }
}

export default new MyConnection();
