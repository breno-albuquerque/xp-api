import fetch from 'node-fetch';
import MyConnection from '../database/connections/MyConnection';
import PgConnection from '../database/connections/PgConnection';
import AtivoModel from '../models/Ativo.model';
import HttpException from '../utils/http.exception';
import HttpStatus from '../utils/http.status';
import { IAtivo, IFullAtivo } from '../interfaces/IAtivo';

class AtivoService {
  public static async getAll(): Promise<IAtivo[]> {
    const result = await AtivoModel.getAll(PgConnection);
    return result;
  }

  public static async getById(assetId: number) {
      const asset = await AtivoModel.getById(PgConnection, assetId);

      if (asset.length === 0) {
        throw new HttpException(HttpStatus.NOT_FOUND, 'Ativo não encontrado');
      }

      const latestValue = await this.getValue(asset[0].Simbolo);
      return this.formatAsset(asset[0], latestValue);
  }

  public static async getByClient(clientId: number) {
    const assets = await AtivoModel.getByClient(PgConnection, clientId);
    
    // Optei por não lançar essa excessão, pensando no frontend, achei melhor retornar o array vazio
    
    /* if (assets.length === 0) { 
      throw new HttpException(HttpStatus.CONFLICT, 'Não há ativos na carteira');
    } */

    const valuesPromises: Promise<number>[] = [];
    assets.forEach((asset) => {
      valuesPromises.push(this.getValue(asset.Simbolo));
    });
    const latestValues = await Promise.all(valuesPromises);

    return this.formatClientAsset(assets, latestValues);
  }

  public static async updateWhenBought(assetId: number, quantity: number): Promise<void> {
    const asset = await AtivoModel.getById(PgConnection, assetId);

    if (asset[0].QtdeAtivo < quantity) {
      throw new HttpException(HttpStatus.CONFLICT, 'Quantidade indisponível');
    }

    await AtivoModel.update(PgConnection, asset[0].QtdeAtivo - quantity, assetId);
  }

  public static async updateWhenSold(assetId: number, quantity: number): Promise<void> {
    const asset = await AtivoModel.getById(PgConnection, assetId);
    await AtivoModel.update(PgConnection, asset[0].QtdeAtivo + quantity, assetId);
  }

  public static async getValue(symbol: string): Promise<number> {
    const latestResponse = await fetch(`https://www.okanebox.com.br/api/acoes/ultima/${symbol}`);
    const latestData = await latestResponse.json();
    return latestData.PREULT;
  }

  private static formatAsset(asset: IAtivo, latestValue: number) {
    return {
      CodAtivo: asset.Id,
      Simbolo: asset.Simbolo,
      QtdeAtivo: asset.QtdeAtivo,
      Valor: latestValue,
    };
  }

  // CORRIGIR TIPAGENS:

  private static formatClientAsset(assets: IFullAtivo[], latestValues: number[]) {
    return assets.map((asset: IFullAtivo, index: number) => ({
      CodAtivo: asset.Id,
      CodCliente: asset.CodCliente,
      QtdeAtivo: asset.QtdeAtivo,
      Simbolo: asset.Simbolo,
      Valor: latestValues[index],
    }));
  }
}

export default AtivoService;
