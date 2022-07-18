import MyConnection from "../database/MyConnection";
import INewConta from "../interfaces/conta/INewConta";
import HttpException from "../utils/http.exception";
import HttpStatus from "../utils/http.status";
import  jwt from "../utils/jwt.token";
import bcrypt from 'bcrypt';
import ContaModel from "../models/Conta.model";

class AuthService {
  private static async verifyEmail(conta: INewConta): Promise<void> {
    const isRegistered = await ContaModel.getByEmail(MyConnection.queries.getContaByEmail, conta.email);
    if (isRegistered) throw new HttpException(HttpStatus.CONFLICT, 'Email já cadastrado');
  }

  public static async create(conta: INewConta): Promise<string> {
    await this.verifyEmail(conta);

    const hash = await bcrypt.hash(conta.senha, 5);
    const insertId = await ContaModel.create(MyConnection.queries.createConta, { ...conta, senha: hash });

    const token = jwt.generateToken({ id: insertId, ...conta });
    return token;
  }

  public static async login(conta: INewConta): Promise<string> {
      const dadosConta = await ContaModel.getByEmail(MyConnection.queries.getContaByEmail, conta.email);
      if (!dadosConta) throw new HttpException(HttpStatus.UNAUTHORIZED, 'Email ou senha inválidos');

      const isMatch = await bcrypt.compare(conta.senha, dadosConta.senha);
      if (!isMatch) throw new HttpException(HttpStatus.UNAUTHORIZED, 'Email ou senha inválidos');

      const token = jwt.generateToken({ id: dadosConta.id, ...conta });
      return token;
  }
}

export default AuthService;
