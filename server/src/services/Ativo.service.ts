import MyConnection from "../database/MyConnection";
import AtivoModel from "../models/Ativo.model";
import HttpException from "../utils/http.exception";
import HttpStatus from "../utils/http.status";
import IAtivo from "../interfaces/ativo/IAtivo";

class AtivoService {
  public static async getById(assetId: number) {
      const asset = await AtivoModel.getById(MyConnection, assetId);
      if (!asset) throw new HttpException(HttpStatus.NOT_FOUND, 'Ativo não encontrado');

      const latestValue = await this.getValue(asset.simbolo);
      const fullAsset = this.formatAsset(asset, latestValue);

      return fullAsset;
  }

  private static async getValue(assertSymbol: string) {
    const assetLatestResponse = await fetch(`https://www.okanebox.com.br/api/acoes/ultima/${assertSymbol}`);
    const assetLatestData = await assetLatestResponse.json();
    return assetLatestData.PREULT;
  }

  private static formatAsset(asset: IAtivo, latestValue: number) {
    return {
      CodAtivo: asset.id,
      QtdeAtivo: asset.quantidade,
      Valor: latestValue
    }
  }
}

export default AtivoService;
