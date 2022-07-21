import mysql from 'mysql2/promise';
import IConnection from '../interfaces/IConnection';

type QueryVariable = string | number;

class MyConnection implements IConnection {
  public queries: any = {
    createConta: 'INSERT INTO Contas (Nome, Cpf, Email, Senha) VALUES (?, ?, ?, ?)',
    getContaById: 'SELECT Id, Nome, Saldo FROM Contas WHERE Id = ?',
    getContaByEmail: 'SELECT * FROM Contas WHERE Email = ?',
    updateConta: 'UPDATE Contas SET Saldo=? WHERE Id=?',

    createDeposito: 'INSERT INTO Depositos (CodCliente, Valor) VALUES (?, ?)',

    createSaque: 'INSERT INTO Saques (CodCliente, Valor) VALUES (?, ?)',

    getAtivoById: 'SELECT * FROM Ativos WHERE Id = ?',
    updateAtivo: 'UPDATE Ativos SET QtdeAtivo=? WHERE Id=?',
    getAllAtivos: 'SELECT * FROM Ativos',
    getAtivosByClient: `
    SELECT a.Id, a.Simbolo, i.CodCliente, i.QtdeAtivo, a.Simbolo
    FROM Investimentos AS i
    INNER JOIN Ativos AS a
    ON a.Id = i.CodAtivo
    WHERE i.CodCliente = ?
    `,

    getOneInvestimento: 'SELECT * FROM Investimentos WHERE CodCliente=? AND CodAtivo=?',  
    createInvestimento: 'INSERT INTO Investimentos (CodCliente, CodAtivo, QtdeAtivo) VALUES (?, ?, ?)',
    updateInvestimento: 'UPDATE Investimentos SET QtdeAtivo=? WHERE CodAtivo=? AND CodCliente=?',
    deleteInvestimento: 'DELETE FROM Investimentos WHERE CodAtivo=? AND CodCliente=?',
  };

  private static connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  public async run(query: string, values?: QueryVariable[]): Promise<any> {
     const [result] = await MyConnection.connection.execute(query, values);
     return result;
  }
}

export default new MyConnection();
