import MyConnection from "../database/MyConnection";
import INewConta from "../interfaces/conta/INewConta";
import HttpException from "../utils/http.exception";
import HttpStatus from "../utils/http.status";
import  jwt from "../utils/jwt.token";
import bcrypt from 'bcrypt';
import ContaModel from "../models/Conta.model";

class AuthService {
  private static async verifyEmail(account: INewConta): Promise<void> {
    const isRegistered = await ContaModel.getByEmail(MyConnection, account.email);
    if (isRegistered) throw new HttpException(HttpStatus.CONFLICT, 'Email já cadastrado');
  }

  public static async create(account: INewConta): Promise<string> {
    await this.verifyEmail(account);

    const hash = await bcrypt.hash(account.senha, 5);
    const insertId = await ContaModel.create(MyConnection, { ...account, senha: hash });

    const token = jwt.generateToken({ id: insertId, ...account });
    return token;
  }

  public static async login(account: INewConta): Promise<string> {
      const accountData = await ContaModel.getByEmail(MyConnection, account.email);
      if (!accountData) throw new HttpException(HttpStatus.UNAUTHORIZED, 'Email ou senha inválidos');

      const isMatch = await bcrypt.compare(account.senha, accountData.senha);
      if (!isMatch) throw new HttpException(HttpStatus.UNAUTHORIZED, 'Email ou senha inválidos');

      const token = jwt.generateToken({ id: accountData.id, ...account });
      return token;
  }
}

export default AuthService;
