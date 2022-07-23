import bcrypt from 'bcrypt';
import { INewConta } from '../interfaces/IConta';
import HttpException from '../utils/http.exception';
import HttpStatus from '../utils/http.status';
import jwt from '../utils/jwt.token';
import ContaService from './Conta.service';

class AuthService {
  private static async verifyEmail(account: INewConta): Promise<void> {
    const isRegistered = await ContaService.getByEmail(account.Email);
    if (isRegistered) throw new HttpException(HttpStatus.CONFLICT, 'Email já cadastrado');
  }

  public static async register(account: INewConta): Promise<number> {
    await this.verifyEmail(account);

    const hash = await bcrypt.hash(account.Senha, 5);
    const rowCount = await ContaService.create({ ...account, Senha: hash });

    return rowCount;
  }

  public static async login(account: INewConta): Promise<string> {
      const accountData = await ContaService.getByEmail(account.Email);
      if (!accountData) throw new HttpException(HttpStatus.UNAUTHORIZED, 'Email ou senha inválidos');
      
      const isMatch = await bcrypt.compare(account.Senha, accountData.Senha);
      if (!isMatch) throw new HttpException(HttpStatus.UNAUTHORIZED, 'Email ou senha inválidos');

      const token = jwt.generateToken({ Id: accountData.Id, Nome: accountData.Nome });
      return token;
  }
}

export default AuthService;
