//  import MyConnection from '../database/connections/MyConnection';
import PgConnection from '../database/connections/PgConnection';
import IConnection from '../interfaces/IConnection';
import IInvestimento from '../interfaces/IInvestimento';
import InvestimentoModel from '../models/Investimento.model';
import HttpException from '../utils/http.exception';
import HttpStatus from '../utils/http.status';
import AtivoService from './Ativo.service';
import ContaService from './Conta.service';

class InvestimentoService {
  static conn: IConnection = PgConnection;

  public static async purchase(investment: IInvestimento): Promise<void> {
    console.log(0, investment);
    const prevInvest = await InvestimentoModel
      .getOne(this.conn, investment);

      console.log('1', prevInvest);
      
      await this.purchaseOperations(investment);
      
      if (!prevInvest) {
        console.log('2', prevInvest);
      await InvestimentoModel
        .create(this.conn, investment);
    } else {
      await InvestimentoModel
        .update(this.conn, { 
          ...investment, QtdeAtivo: investment.QtdeAtivo + prevInvest.QtdeAtivo });
    }
  }

  public static async sale(investment: IInvestimento): Promise<void> {
    const prevInvest = await InvestimentoModel
      .getOne(this.conn, investment);

    await this.saleOperations(investment, prevInvest);

    const newValues = prevInvest.QtdeAtivo - investment.QtdeAtivo;

    if (newValues === 0) {
      await InvestimentoModel.delete(this.conn, investment.CodAtivo, investment.CodCliente);
    } else {
        await InvestimentoModel.update(this.conn, { 
          ...investment, QtdeAtivo: prevInvest.QtdeAtivo - investment.QtdeAtivo });
    }
  }

  public static async saleOperations(investment: IInvestimento, prevInvest: IInvestimento) {
    const { CodAtivo, CodCliente, QtdeAtivo } = investment;

    if (!prevInvest) {
      throw new HttpException(HttpStatus.CONFLICT, 'Ativo não está presente na carteira');
    }
    if (prevInvest.QtdeAtivo < QtdeAtivo) {
      throw new HttpException(HttpStatus.CONFLICT, 'Carteira com quantidade insuficiente');
    }

    const fullAsset = await AtivoService.getById(CodAtivo);
    await ContaService.deposit(CodCliente, Number((fullAsset.Valor * QtdeAtivo).toFixed(2)));
    await AtivoService.updateWhenSold(CodAtivo, QtdeAtivo);
  }

  public static async purchaseOperations(invest: IInvestimento) {
    const { CodAtivo, CodCliente, QtdeAtivo } = invest;
    const fullAsset = await AtivoService.getById(CodAtivo);  
    await ContaService.withdrawal(CodCliente, Number((fullAsset.Valor * QtdeAtivo).toFixed(2)));  
    await AtivoService.updateWhenBought(CodAtivo, QtdeAtivo);
  }
}

export default InvestimentoService;
