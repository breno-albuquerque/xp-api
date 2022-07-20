import { RowDataPacket } from "mysql2";
import MyConnection from "../database/MyConnection";
import IInvestimento from "../interfaces/investimento/IInvestimento";
import InvestimentoModel from "../models/Investimento.model";
import HttpException from "../utils/http.exception";
import HttpStatus from "../utils/http.status";
import AtivoService from "./Ativo.service";
import ContaService from "./Conta.service";

class InvestimentoService {
  public static async purchase(investment: IInvestimento): Promise<void> {
    const previousInvestment = await InvestimentoModel
      .getOne(MyConnection, investment);

    await this.purchaseOperations(investment);

    if (!previousInvestment) {
       await InvestimentoModel
        .create(MyConnection, investment);
    } else {
       await InvestimentoModel
        .update(MyConnection, { 
          ...investment, 
          QtdeAtivo: investment.QtdeAtivo + previousInvestment.quantidade 
        });
    }
  }

  public static async sale(investment: IInvestimento): Promise<void> {
    const previousInvestment = await InvestimentoModel
      .getOne(MyConnection, investment);

    await this.saleOperations(investment, previousInvestment);
    const newQuantity = previousInvestment.quantidade - investment.QtdeAtivo;
    await InvestimentoModel.update(MyConnection, { ...investment, QtdeAtivo: newQuantity });
  }

  private static async saleOperations(investment: IInvestimento, previousInvestment: RowDataPacket): Promise<void> {
    const { CodAtivo, CodCliente, QtdeAtivo } = investment;

    if (!previousInvestment) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Ativo não encontrado na carteira');
    }
    if (previousInvestment.quantidade < QtdeAtivo) {
      throw new HttpException(HttpStatus.CONFLICT, 'Carteira com quantidade insuficiente');
    }

    const fullAsset = await AtivoService.getById(CodAtivo);
    await ContaService.deposit(CodCliente, Number((fullAsset.Valor * QtdeAtivo).toFixed(2)));
    await AtivoService.updateWhenSold(CodAtivo, QtdeAtivo);
  }

  private static async purchaseOperations(investment: IInvestimento): Promise<void> {
    const { CodAtivo, CodCliente, QtdeAtivo } = investment;
    const fullAsset = await AtivoService.getById(CodAtivo);  
    await ContaService.withdrawal(CodCliente, Number((fullAsset.Valor * QtdeAtivo).toFixed(2)));  
    await AtivoService.updateWhenBought(CodAtivo, QtdeAtivo);
  }
}

export default InvestimentoService;
