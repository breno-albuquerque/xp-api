import { IAtivoQueries, IContaQueries, IInvestimentoQueries, ITransactionQueries } from '../../interfaces/IQueries';

export const qConta: IContaQueries = {
  create: 'INSERT INTO Contas (Nome, Cpf, Email, Senha) VALUES (?, ?, ?, ?)',
  getById: 'SELECT Id, Nome, Saldo FROM Contas WHERE Id = ?',
  getByEmail: 'SELECT * FROM Contas WHERE Email = ?',
  update: 'UPDATE Contas SET Saldo=? WHERE Id=?',
};

export const qDeposito: ITransactionQueries = {
  create: 'INSERT INTO Depositos (CodCliente, Valor) VALUES (?, ?)',
};

export const qSaque: ITransactionQueries = {
  create: 'INSERT INTO Saques (CodCliente, Valor) VALUES (?, ?)',
};

export const qAtivo: IAtivoQueries = {
  getById: 'SELECT * FROM Ativos WHERE Id = ?',
  update: 'UPDATE Ativos SET QtdeAtivo=? WHERE Id=?',
  getAll: 'SELECT * FROM Ativos',
  getByClient: `SELECT a.Id, a.Simbolo, i.CodCliente, i.QtdeAtivo, a.Simbolo
  FROM Investimentos AS i INNER JOIN Ativos AS a
  ON a.Id = i.CodAtivo WHERE i.CodCliente = ?`,
};

export const qInvestimento: IInvestimentoQueries = {
  getOne: 'SELECT * FROM Investimentos WHERE CodCliente=? AND CodAtivo=?',  
  create: 'INSERT INTO Investimentos (CodCliente, CodAtivo, QtdeAtivo) VALUES (?, ?, ?)',
  update: 'UPDATE Investimentos SET QtdeAtivo=? WHERE CodAtivo=? AND CodCliente=?',
  delete: 'DELETE FROM Investimentos WHERE CodAtivo=? AND CodCliente=?',
};
