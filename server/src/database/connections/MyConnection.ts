import mysql from 'mysql2/promise';
import * as q from '../../interfaces/IQueries';
import IConnection from '../../interfaces/IConnection';
import { qAtivo, qConta, qDeposito, qInvestimento, qSaque } from '../queries/My.queries';

type QueryVariable = string | number;

class MyConnection implements IConnection {
  public qConta: q.IContaQueries = qConta;

  public qDeposito: q.ITransactionQueries = qDeposito;

  public qSaque: q.ITransactionQueries = qSaque;

  public qAtivo: q.IAtivoQueries = qAtivo;

  public qInvestimento: q.IInvestimentoQueries = qInvestimento;

  private static connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  // eslint-disable-next-line class-methods-use-this
  public async run(query: string, values?: QueryVariable[]): Promise<unknown> {
     const [result] = await MyConnection.connection.execute(query, values);
     return result;
  }
}

export default new MyConnection();
