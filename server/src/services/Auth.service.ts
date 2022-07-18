import MyConnection from "../database/MyConnection";
import INewConta from "../interfaces/conta/INewConta";
import HttpException from "../utils/http.exception";
import HttpStatus from "../utils/http.status";
import { generateToken } from "../utils/jwt.token";
import bcrypt from 'bcrypt';
import AuthModel from "../models/Auth.model";

class AuthService {
  private static async verifyEmail(conta: INewConta): Promise<void> {
    const isRegistered = await AuthModel.getByEmail(MyConnection.queries.getContaByEmail, conta.email);
    if (isRegistered) throw new HttpException(HttpStatus.CONFLICT, 'Email já cadastrado');
  }

  public static async create(conta: INewConta): Promise<string> {
    //  Verifica se email ja está registrado:
    await this.verifyEmail(conta);

    //  Cria conta:
    const hash = await bcrypt.hash(conta.senha, 5);
    const insertId = await AuthModel.create(MyConnection.queries.createConta, { ...conta, senha: hash });

    // Gera token:
    const token = generateToken({ id: insertId, ...conta });
    return token;
  }

  public static async login(conta: INewConta): Promise<string> {
      const dadosConta = await AuthModel.getByEmail(MyConnection.queries.getContaByEmail, conta.email);
      if (!dadosConta) throw new HttpException(HttpStatus.UNAUTHORIZED, 'Email ou senha inválidos');

      const isMatch = await bcrypt.compare(conta.senha, dadosConta.senha);
      if (!isMatch) throw new HttpException(HttpStatus.UNAUTHORIZED, 'Email ou senha inválidos');

      // Gera token:
      const token = generateToken({ id: dadosConta.id, ...conta });
      return token;
  }
}

export default AuthService;
