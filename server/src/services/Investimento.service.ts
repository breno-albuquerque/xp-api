import MyConnection from "../database/MyConnection";
import InvestimentoModel from "../models/Investimento.model";

class InvestimentoService {
  public static async buyAssets(accountId: number, assetId: number, quantity: number) {
    const previousInvestment = await InvestimentoModel.getOne(MyConnection, accountId, assetId);

    if (!previousInvestment) {
      await InvestimentoModel
        .create(MyConnection.queries.createInvestment, accountId, assetId, quantity)
    } else {
      await InvestimentoModel
        .update(MyConnection.queries.updateInvestment, accountId, assetId, quantity + previousInvestment.quantitdade)
    }
  }
}

export default InvestimentoService;
