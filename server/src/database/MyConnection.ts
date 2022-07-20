import mysql from 'mysql2/promise';
import IConnection from '../interfaces/connection/IConnection';

type QueryVariable = string | number;

class MyConnection implements IConnection {
  public queries: any = {
    createConta: 'INSERT INTO Contas (Nome, Cpf, Email, Senha) VALUES (?, ?, ?, ?)',
    getContaById: 'SELECT * FROM Contas WHERE Id = ?',
    getContaByEmail: 'SELECT * FROM Contas WHERE Email = ?',
    updateConta: 'UPDATE Contas SET Saldo=? WHERE Id=?',
    createDeposito: 'INSERT INTO Depositos (CodConta, Valor) VALUES (?, ?)',
    createSaque: 'INSERT INTO Saques (CodConta, Valor) VALUES (?, ?)',
    getAtivoById: 'SELECT * FROM Ativos WHERE Id = ?',
    getOneInvestimento: 'SELECT * FROM Investimentos WHERE CodConta=? AND CodAtivo=?',
    createInvestimento: 'INSERT INTO Investimentos (CodConta, CodAtivo, QtdeAtivo) VALUES (?, ?, ?)',
    updateAtivo: 'UPDATE Ativos SET QtdeAtivo=? WHERE Id=?',
    updateInvestimento: 'UPDATE Investimentos SET QtdeAtivo=? WHERE CodAtivo=? AND CodConta=?',
    deleteInvestimento: 'DELETE FROM Investimentos WHERE CodAtivo=? AND CodConta=?',
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
