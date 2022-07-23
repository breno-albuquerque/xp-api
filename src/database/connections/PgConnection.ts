import { Pool } from 'pg';
import * as q from '../../interfaces/IQueries';
import IConnection from '../../interfaces/IConnection';
import { qAtivo, qConta, qDeposito, qInvestimento, qSaque } from '../queries/Pg.queries';

type QueryVariable = string | number;

class PgConnection implements IConnection {
  public qConta: q.IContaQueries = qConta;

  public qDeposito: q.ITransactionQueries = qDeposito;

  public qSaque: q.ITransactionQueries = qSaque;

  public qAtivo: q.IAtivoQueries = qAtivo;

  public qInvestimento: q.IInvestimentoQueries = qInvestimento;

  private static pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT),
  });

  // eslint-disable-next-line class-methods-use-this
  public async run(query: string, values?: QueryVariable[]): Promise<unknown> {
    const result = await PgConnection.pool.query(query, values);
     return result;
  }
}

export default new PgConnection();
