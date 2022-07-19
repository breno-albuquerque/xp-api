import MyConnection from "../database/MyConnection";
import InvestimentoModel from "../models/Investimento.model";
import HttpException from "../utils/http.exception";
import HttpStatus from "../utils/http.status";
import AtivoService from "./Ativo.service";
import ContaService from "./Conta.service";

class InvestimentoService {
  public static async buyAssets(accountId: number, assetId: number, quantity: number) {
    const fullAsset = await AtivoService.getById(assetId);
    const accountData = await ContaService.getById(accountId);

    
    if (fullAsset.Valor > accountData.saldo) {
      throw new HttpException(HttpStatus.CONFLICT, 'Saldo insuficiente');
    }
    
    await ContaService.withdrawal(accountId, Number((fullAsset.Valor * quantity).toFixed(2)));

    const previousInvestment = await InvestimentoModel.getOne(MyConnection, accountId, assetId);

    await AtivoService.updateWhenBought(assetId, quantity);

    if (!previousInvestment) {
      await InvestimentoModel
        .create(MyConnection, accountId, assetId, quantity)
    } else {
      await InvestimentoModel
        .update(MyConnection, accountId, assetId, quantity + previousInvestment.quantidade);
    }
  }

  public static async sellAssets(accountId: number, assetId: number, quantity: number) {
    const previousInvestment = await InvestimentoModel.getOne(MyConnection, accountId, assetId);

    if (!previousInvestment) {
      throw new HttpException(HttpStatus.UNPROCESSABLE, 'É preciso ter o ativo na carteira para vendê-lo');
    }

    if (previousInvestment.quantidade < quantity) {
      throw new HttpException(HttpStatus.UNPROCESSABLE, 'Você não tem essa quantidade disponível para venda');
    }

    const fullAsset = await AtivoService.getById(assetId);

    await ContaService.deposit(accountId, Number((fullAsset.Valor * quantity).toFixed(2)));

    await AtivoService.updateWhenSold(assetId, quantity);
    await InvestimentoModel.update(MyConnection, accountId, assetId, previousInvestment.quantidade - quantity);
  }
}

export default InvestimentoService;
