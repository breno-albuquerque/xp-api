import MyConnection from "../database/MyConnection";
import AtivoModel from "../models/Ativo.model";
import HttpException from "../utils/http.exception";
import HttpStatus from "../utils/http.status";

class AtivoService {
  public static async getById(assetId: number) {
      const asset = await AtivoModel.getById(MyConnection, assetId);
      if (!asset) throw new HttpException(HttpStatus.NOT_FOUND, 'Ativo não encontrado');
      const latestValue = await AtivoService.getValue(asset.simbolo);

      const fullAsset = {
        CodAtivo: asset.id,
        QtdeAtivo: asset.quantidade,
        Valor: latestValue
      }

      return fullAsset;
  }

  private static async getValue(assertSymbol: string) {
    const assetLatestResponse = await fetch(`https://www.okanebox.com.br/api/acoes/ultima/${assertSymbol}`);
    const assetLatestData = await assetLatestResponse.json();
    return assetLatestData.PREULT;
  }
}

export default AtivoService;
