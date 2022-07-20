import fetch from 'node-fetch';
import MyConnection from '../database/MyConnection';
import AtivoModel from '../models/Ativo.model';
import HttpException from '../utils/http.exception';
import HttpStatus from '../utils/http.status';
import IAtivo from '../interfaces/ativo/IAtivo';

class AtivoService {
  public static async getById(assetId: number) {
      const asset = await AtivoModel.getById(MyConnection, assetId);
      if (!asset) throw new HttpException(HttpStatus.NOT_FOUND, 'Ativo não encontrado');

      const latestValue = await this.getValue(asset.simbolo);
      return this.formatAsset(asset, latestValue);
  }

  public static async updateWhenBought(assetId: number, quantity: number): Promise<void> {
    const asset = await AtivoModel.getById(MyConnection, assetId);

    if (asset.quantidade < quantity) {
      throw new HttpException(HttpStatus.UNPROCESSABLE, 'Quantidade indisponível');
    }

    await AtivoModel.update(MyConnection, asset.quantidade - quantity, assetId);
  }

  public static async updateWhenSold(assetId: number, quantity: number): Promise<void> {
    const asset = await AtivoModel.getById(MyConnection, assetId);
    await AtivoModel.update(MyConnection, asset.quantidade + quantity, assetId);
  }

  public static async getValue(symbol: string): Promise<number> {
    const latestResponse = await fetch(`https://www.okanebox.com.br/api/acoes/ultima/${symbol}`);
    const latestData = await latestResponse.json();
    return latestData.PREULT;
  }

  private static formatAsset(asset: IAtivo, latestValue: number) {
    return {
      CodAtivo: asset.id,
      QtdeAtivo: asset.quantidade,
      Valor: latestValue,
    };
  }
}

export default AtivoService;
