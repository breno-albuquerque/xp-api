/* eslint-disable @typescript-eslint/no-explicit-any */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import chaiAsPromised = require('chai-as-promised');
import InvestimentoModel from '../../models/Investimento.model';
import investimentoMock from '../mocks/investimento.mock.spec';
import InvestimentoService from '../../services/Investimento.service';
import HttpException from '../../utils/http.exception';

chai.use(chaiAsPromised);

type InvestModelMethods = 'getOne' | 'create' | 'update' | 'delete';

const createInvestModelStub = (resolveValue: any, method: InvestModelMethods): sinon.SinonStub => (
  sinon.stub(InvestimentoModel, method).resolves(resolveValue)
);

describe('Testa métodos da classe InvestimentoService', () => {
  let stub1: sinon.SinonStub;
  let stub2: sinon.SinonStub;
  let stub3: sinon.SinonStub;

  afterEach(() => {
    const stubs = [stub1, stub2, stub3];
    stubs.forEach((stub) => stub && stub.restore());
  });

  context('Método purchase', () => {
    it('Quando o cliente ainda não investiu na respectiva ação, InvestimentoModel.create deve ser chamado', async () => {
      stub1 = createInvestModelStub(undefined, 'getOne');
      stub2 = createInvestModelStub({ insertId: 1 }, 'create');
      stub3 = sinon.stub(InvestimentoService, 'purchaseOperations').resolves(undefined);
      
      await InvestimentoService.purchase(investimentoMock);
      expect(stub2.calledOnce).to.equal(true);
    });

    it('Quando o cliente já investiu na respectiva ação, InvestimentoModel.update deve ser chamado', async () => {
      stub1 = createInvestModelStub(investimentoMock, 'getOne');
      stub2 = createInvestModelStub({ affectedRows: 1 }, 'update');
      stub3 = sinon.stub(InvestimentoService, 'purchaseOperations').resolves(undefined);

      await InvestimentoService.purchase(investimentoMock);
      expect(stub2.calledOnce).to.equal(true);
    });
  });

  context('Método sale', () => {
    it('Quando o cliente ainda não possui o ativo que quer vender, uma excessão deve ser lançada: "Ativo não está presente na carteira"', async () => {
      stub1 = createInvestModelStub(undefined, 'getOne');
  
      await expect(InvestimentoService.sale(investimentoMock))
        .to.be.rejectedWith(HttpException, 'Ativo não está presente na carteira');
    });
    
    it('Quando o cliente não possui quantidade suficiente do ativo, uma excessão deve ser lançada: "Carteira com quantidade insuficiente"', async () => {
      stub1 = createInvestModelStub(investimentoMock, 'getOne');

      await expect(InvestimentoService.sale({ ...investimentoMock, QtdeAtivo: 11 }))
        .to.be.rejectedWith(HttpException, 'Carteira com quantidade insuficiente');
    });

    it('Quando o cliente possui quantidade maior do que a venda, InvestimentoModel.update deve ser chamado', async () => {
      stub1 = sinon.stub(InvestimentoService, 'saleOperations').resolves(undefined);
      stub2 = createInvestModelStub({ ...investimentoMock, QtdeAtivo: 5 }, 'getOne');
      stub3 = createInvestModelStub({ affectedRows: 1 }, 'update');
      
      await InvestimentoService.sale(investimentoMock);
      expect(stub2.calledOnce).to.equal(true);
    });

    it('Quando o cliente possui quantidade igual a da venda, InvestimentoModel.delete deve ser chamado', async () => {
      stub1 = sinon.stub(InvestimentoService, 'saleOperations').resolves(undefined);
      stub2 = createInvestModelStub(investimentoMock, 'getOne');
      stub3 = createInvestModelStub({ affectedRows: 1 }, 'delete');
      
      await InvestimentoService.sale(investimentoMock);
      expect(stub2.calledOnce).to.equal(true);
    });
  });
});
