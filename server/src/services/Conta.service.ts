import MyConnection from "../database/MyConnection";
import IConta from "../interfaces/conta/IConta";
import INewConta from "../interfaces/conta/INewConta";
import ContaModel from "../models/Conta.model"
import HttpException from "../utils/http.exception";
import HttpStatus from "../utils/http.status";
import { generateToken } from "../utils/jwt.token";
import bcrypt from 'bcrypt';

class ContaService {
  private static async verifyEmail(conta: INewConta) {
    const isRegistered = await ContaModel.getByEmail(MyConnection.queries.getContaByEmail, conta.email);
    if (isRegistered) throw new HttpException(HttpStatus.CONFLICT, 'Esse email não está disponível');
  }

  public static async create(conta: INewConta): Promise<string | undefined> {
    //  Verifica se email ja está registrado:
    await this.verifyEmail(conta);

    //  Cria conta:
    const { email, password } = conta;
    const hash = await bcrypt.hash(password, 5);
    const insertId = await ContaModel.create(MyConnection.queries.createConta, { email, password: hash });

    // Gera token:
    const token = generateToken({ id: insertId, email: conta.email });
    return token;
  }

  public static async login(conta: INewConta): Promise<string | undefined> {
      const dadosConta = await ContaModel.getByEmail(MyConnection.queries.getContaByEmail, conta.email);
      if (!dadosConta) throw new HttpException(HttpStatus.UNAUTHORIZED, 'Email ou senha inválidos');

      const isMatch = await bcrypt.compare(conta.password, dadosConta.password);
      if (!isMatch) throw new HttpException(HttpStatus.UNAUTHORIZED, 'Email ou senha inválidos');

      // Gera token:
      const token = generateToken({ id: dadosConta.id, email: conta.email });
      return token;
  }
  
  public static async getById(contaId: number): Promise<IConta> {
    const conta = await ContaModel.getById(MyConnection.queries.getContaById, contaId);
    return conta;
  }
}

export default ContaService;
