import MyConnection from '../database/MyConnection';
import IInvestimento from '../interfaces/IInvestimento';
import InvestimentoModel from '../models/Investimento.model';
import HttpException from '../utils/http.exception';
import HttpStatus from '../utils/http.status';
import AtivoService from './Ativo.service';
import ContaService from './Conta.service';

class InvestimentoService {
  public static async purchase(investment: IInvestimento): Promise<void> {
    const prevInvest = await InvestimentoModel
      .getOne(MyConnection, investment);

    await this.purchaseOperations(investment);

    if (!prevInvest) {
      await InvestimentoModel
        .create(MyConnection, investment);
    } else {
      await InvestimentoModel
        .update(MyConnection, { 
          ...investment, QtdeAtivo: investment.QtdeAtivo + prevInvest.QtdeAtivo });
    }
  }

  public static async sale(investment: IInvestimento): Promise<void> {
    const prevInvest = await InvestimentoModel
      .getOne(MyConnection, investment);

    await this.saleOperations(investment, prevInvest);

    await InvestimentoModel.update(MyConnection, { 
      ...investment, QtdeAtivo: prevInvest.QtdeAtivo - investment.QtdeAtivo });
  }

  public static async saleOperations(investment: IInvestimento, prevInvest: IInvestimento) {
    const { CodAtivo, CodCliente, QtdeAtivo } = investment;

    if (!prevInvest) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Ativo não encontrado na carteira');
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
