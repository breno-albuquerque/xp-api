import mysql from 'mysql2/promise';
import IConnection from '../interfaces/connection/IConnection';

type QueryVariable = string | number;

class MyConnection implements IConnection {
  public queries: any = {
    createConta: 'INSERT INTO Contas (nome, cpf, email, senha) VALUES (?, ?, ?, ?)',
    getContaById: 'SELECT * FROM Contas WHERE id = ?',
    getContaByEmail: 'SELECT * FROM Contas WHERE email = ?',
    updateConta: 'UPDATE Contas SET saldo=? WHERE id=?',
    createDeposito: 'INSERT INTO Depositos (contaId, valor) VALUES (?, ?)',
    getAtivoById: 'SELECT * FROM Ativos WHERE id = ?',
    getOneInvestimento: 'SELECT * FROM Investimentos WHERE contaId=? AND ativoId=?',
    createInvestimento: 'INSERT INTO Investimentos (contaId, ativoId, quantidade) VALUES (?, ?, ?)',
    updateAtivo: 'UPDATE Ativos SET quantidade=? WHERE id=?'
  };

  private static connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });

  public async run(query: string, values?: QueryVariable[]): Promise<any> {
     const [result] = await MyConnection.connection.execute(query, values);
     return result;
  }
}

export default new MyConnection();
