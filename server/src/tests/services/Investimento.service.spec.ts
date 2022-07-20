import chai, { expect } from 'chai';
import sinon from 'sinon';
import chaiAsPromised = require('chai-as-promised');
import InvestimentoModel from '../../models/Investimento.model';
import investimentoMock from '../mocks/investimento.mock.spec';
import InvestimentoService from '../../services/Investimento.service';

chai.use(chaiAsPromised);

type InvestModelMethods = 'getOne' | 'create' | 'update' | 'delete';

const createInvestModelStub = (resolveValue: any, method: InvestModelMethods): sinon.SinonStub => (
  sinon.stub(InvestimentoModel, method).resolves(resolveValue)
);

describe('Testa métodos da classe InvestimentoService', () => {
  context('Método purchase', () => {
    let stub1: sinon.SinonStub;
    let stub2: sinon.SinonStub;
    let stub3: sinon.SinonStub;

    afterEach(() => {
      const stubs = [stub1, stub2, stub3];
      stubs.forEach((stub) => stub && stub.restore());
    });

    it('Quando o cliente ainda não investiu na respectiva ação, InvestimentoModel.create deve ser chamado', async () => {
      stub1 = createInvestModelStub(undefined, 'getOne');
      stub2 = createInvestModelStub({ insertId: 1 }, 'create');
      stub3 = sinon.stub(InvestimentoService, 'purchaseOperations').resolves(undefined);
      
      await InvestimentoService.purchase(investimentoMock);
      expect(stub2.calledOnce).to.equal(true);
    });
    it ('Quando o cliente já investiu na respectiva ação, InvestimentoModel.update deve ser chamado', async () => {
      stub1 = createInvestModelStub(investimentoMock, 'getOne');
      stub2 = createInvestModelStub({ affectedRows: 1 }, 'update');
      stub3 = sinon.stub(InvestimentoService, 'purchaseOperations').resolves(undefined);

      await InvestimentoService.purchase(investimentoMock);
      expect(stub2.calledOnce).to.equal(true);
    });
  });
});