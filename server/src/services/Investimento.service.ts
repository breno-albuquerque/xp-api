import MyConnection from "../database/MyConnection";
import InvestimentoModel from "../models/Investimento.model";
import AtivoService from "./Ativo.service";

class InvestimentoService {
  public static async buyAssets(accountId: number, assetId: number, quantity: number) {
    const previousInvestment = await InvestimentoModel.getOne(MyConnection, accountId, assetId);

    await AtivoService.updatePlus(assetId, quantity);

    if (!previousInvestment) {
      await InvestimentoModel
        .create(MyConnection, accountId, assetId, quantity)
    } else {
      await InvestimentoModel
        .update(MyConnection, accountId, assetId, quantity + previousInvestment.quantitdade)
    }
  }
}

export default InvestimentoService;
