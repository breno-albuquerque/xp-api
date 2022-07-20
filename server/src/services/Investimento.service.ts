import MyConnection from "../database/MyConnection";
import InvestimentoModel from "../models/Investimento.model";
import HttpException from "../utils/http.exception";
import HttpStatus from "../utils/http.status";
import AtivoService from "./Ativo.service";
import ContaService from "./Conta.service";

class InvestimentoService {
  public static async buyAssets(accountId: number, assetId: number, quantity: number) {
    const previousInvestment = await InvestimentoModel.getOne(MyConnection, [accountId, assetId]);

    await this.purchaseOperations(accountId, assetId, quantity);

    if (!previousInvestment) {
      return await InvestimentoModel
        .create(MyConnection, [accountId, assetId, quantity])
    } 
      return await InvestimentoModel
        .update(MyConnection, [accountId, assetId, quantity + previousInvestment.quantidade]);
  }

  public static async sellAssets(accountId: number, assetId: number, quantity: number) {
    const previousInvestment = await InvestimentoModel.getOne(MyConnection, [accountId, assetId]);

    if (!previousInvestment) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Ativo não encontrado na carteira');
    }

    if (previousInvestment.quantidade < quantity) {
      throw new HttpException(HttpStatus.CONFLICT, 'Carteira com quantidade insuficiente');
    }

    await this.saleOperations(accountId, assetId, quantity);
    await InvestimentoModel.update(MyConnection, [accountId, assetId, previousInvestment.quantidade - quantity]);
  }

  private static async saleOperations(accountId: number, assetId: number, quantity: number) {
    const fullAsset = await AtivoService.getById(assetId);
    await ContaService.deposit(accountId, Number((fullAsset.Valor * quantity).toFixed(2)));
    await AtivoService.updateWhenSold(assetId, quantity);
  }

  private static async purchaseOperations(accountId: number, assetId: number, quantity: number) {
    const fullAsset = await AtivoService.getById(assetId);  
    await ContaService.withdrawal(accountId, Number((fullAsset.Valor * quantity).toFixed(2)));  
    await AtivoService.updateWhenBought(assetId, quantity);
  }

}

export default InvestimentoService;
