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

      const latestValue = await this.getValue(asset.Simbolo);
      return this.formatAsset(asset, latestValue);
  }

  public static async getByClient(clientId: number) {
    const assets = await AtivoModel.getByClient(MyConnection, clientId);
    
    //  if (assets.length === 0) { }

    const pricePromises: Promise<number>[] = [];

    assets.forEach((asset) => {
      pricePromises.push(this.getValue(asset.Simbolo));
    });

    await Promise.all(pricePromises);

    return assets.map((asset, index) => ({
      CodAtivo: asset.CodAtivo,
      CodCliente: asset.CodConta,
      QtdeAtivo: asset.QtdeAtivo,
      Valor: pricePromises[index],
    }));
  }

  public static async updateWhenBought(assetId: number, quantity: number): Promise<void> {
    const asset = await AtivoModel.getById(MyConnection, assetId);

    if (asset.QtdeAtivo < quantity) {
      throw new HttpException(HttpStatus.UNPROCESSABLE, 'Quantidade indisponível');
    }

    await AtivoModel.update(MyConnection, asset.QtdeAtivo - quantity, assetId);
  }

  public static async updateWhenSold(assetId: number, quantity: number): Promise<void> {
    const asset = await AtivoModel.getById(MyConnection, assetId);
    await AtivoModel.update(MyConnection, asset.QtdeAtivo + quantity, assetId);
  }

  public static async getValue(symbol: string): Promise<number> {
    const latestResponse = await fetch(`https://www.okanebox.com.br/api/acoes/ultima/${symbol}`);
    const latestData = await latestResponse.json();
    return latestData.PREULT;
  }

  private static formatAsset(asset: IAtivo, latestValue: number) {
    return {
      CodAtivo: asset.Id,
      QtdeAtivo: asset.QtdeAtivo,
      Valor: latestValue,
    };
  }
}

export default AtivoService;
