import MyConnection from "../database/MyConnection";
import IConta from "../interfaces/conta/IConta";
import ContaModel from "../models/Conta.model"

class ContaService {
  public static async getById(contaId: number): Promise<IConta> {
    const conta = await ContaModel.getById(MyConnection.queries.getContaById, contaId);
    return conta;
  }

/*   public static async deposit(deposito: INewDeposito) {
    const affectedRows = await ContaModel.deposit(MyConnection.queries.deposit, deposito);
    if (affectedRows === 0) throw new HttpException(HttpStatus.BAD_REQUEST, 'Não foi possível depositar');  
  } */
}

export default ContaService;
