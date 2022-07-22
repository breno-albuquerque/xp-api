import { IAtivoQueries, IContaQueries, IInvestimentoQueries, ITransactionQueries } from './IQueries';

type QueryVariable = string | number;

interface IConnection {
  qConta: IContaQueries,
  qDeposito: ITransactionQueries,
  qSaque: ITransactionQueries,
  qAtivo: IAtivoQueries,
  qInvestimento: IInvestimentoQueries,
  run(query: string, values?: QueryVariable[]): unknown;
}

export default IConnection;
