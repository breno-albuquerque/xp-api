import { IAtivoQueries, IContaQueries, IInvestimentoQueries, ITransactionQueries } from '../../interfaces/IQueries';

export const qConta: IContaQueries = {
  create: 'INSERT INTO "Contas" ("Nome", "Cpf", "Email", "Senha") VALUES ($1,$2,$3,$4)',
  getById: 'SELECT "Id", "Nome", "Saldo" FROM "Contas" WHERE "Id" = $1',
  getByEmail: 'SELECT * FROM "Contas" WHERE "Email" = $1',
  update: 'UPDATE "Contas" SET Saldo=$1 WHERE "Id"=$2',
  delete: 'DELETE FROM "Contas" WHERE "Id"=$1',
};

export const qDeposito: ITransactionQueries = {
  create: 'INSERT INTO "Depositos" ("CodCliente", "Valor") VALUES ($1, $2)',
};

export const qSaque: ITransactionQueries = {
  create: 'INSERT INTO "Saques" ("CodCliente", "Valor") VALUES ($1, $2)',
};

export const qAtivo: IAtivoQueries = {
  getById: 'SELECT * FROM "Ativos" WHERE "Id" = $1',
  update: 'UPDATE "Ativos" SET QtdeAtivo=$1 WHERE "Id"=$2',
  getAll: 'SELECT * FROM "Ativos"',
  getByClient: `SELECT a."Id", a.Simbolo, i."CodCliente", i.QtdeAtivo
  FROM "Investimentos" AS i INNER JOIN "Ativos" AS a
  ON a."Id" = i."CodAtivo" WHERE i."CodCliente" = $1`,
};

export const qInvestimento: IInvestimentoQueries = {
  getOne: 'SELECT * FROM "Investimentos" WHERE "CodCliente"=$1 AND "CodAtivo"=$2',  
  create: 'INSERT INTO "Investimentos" ("CodCliente", "CodAtivo", QtdeAtivo) VALUES ($1, $2, $3)',
  update: 'UPDATE "Investimentos" SET QtdeAtivo=$1 WHERE "CodAtivo"=$2 AND "CodCliente"=$3',
  delete: 'DELETE FROM "Investimentos" WHERE "CodAtivo"=$1 AND "CodCliente"=$2',
};
