import MyConnection from "../database/MyConnection";
import IConta from "../interfaces/conta/IConta";
import ContaModel from "../models/Conta.model"
import HttpException from "../utils/http.exception";
import HttpStatus from "../utils/http.status";

class ContaService {
  public static async getById(contaId: number): Promise<IConta> {
    const conta = await ContaModel.getById(MyConnection, contaId);
    if (!conta) throw new HttpException(HttpStatus.NOT_FOUND, 'Conta não encontrada');
    return conta;
  }

/*   public static async deposit(deposito: INewDeposito) {
    const affectedRows = await ContaModel.deposit(MyConnection.queries.deposit, deposito);
    if (affectedRows === 0) throw new HttpException(HttpStatus.BAD_REQUEST, 'Não foi possível depositar');  
  } */
}

export default ContaService;
