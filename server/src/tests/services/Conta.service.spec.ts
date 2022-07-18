import chai, { expect } from 'chai';
import ContaService from '../../services/Conta.service';
import ContaModel from '../../models/Conta.model';
import DepositoModel from '../../models/Deposito.model';
import HttpException from '../../utils/http.exception';
import sinon from 'sinon';
import chaiAsPromised = require('chai-as-promised');
import { contaMock } from "../mocks/conta.mock.spec";
import SaqueModel from '../../models/Saque.model';

chai.use(chaiAsPromised);

describe('Testa métodos da classe ContaService em Conta.service', () => {
  describe('Método getById', async () => {
    describe('Quando passa o id de uma conta existente', () => {
      let stub: sinon.SinonStub;
  
      beforeEach(async () => {
        stub = sinon.stub(ContaModel, 'getById').resolves(contaMock);
      });
  
      afterEach(async () => {
        stub.restore();
      });

      it('Deve retornar a conta correspondente', async () => {
        const result = await ContaService.getById(1);

        expect(result).to.equal(contaMock);
      });
    });

    describe('Quando passa o id de uma conta inexistente', () => {
      let stub: sinon.SinonStub;

      beforeEach(async () => {
        stub = sinon.stub(ContaModel, 'getById').resolves(undefined);
      });
  
      afterEach(async () => {
        stub.restore();
      });

      it('Uma excessão deve ser lançada com a mensagem "Conta não encontrada"', async () => {
        await expect(ContaService.getById(100))
          .to.be.rejectedWith(HttpException, 'Conta não encontrada');
      });
    });
  });

  describe('Método deposit', async () => {
    describe('Quando passa valores válidos', () => {
      let stub1: sinon.SinonStub;
      let stub2: sinon.SinonStub;
      let stub3: sinon.SinonStub;
  
      beforeEach(async () => {
        stub1 = sinon.stub(ContaModel, 'update').resolves(1);
        stub2 = sinon.stub(DepositoModel, 'create').resolves(1);
        stub3 = sinon.stub(ContaService, 'getById').resolves(contaMock);
      });
  
      afterEach(async () => {
        stub1.restore();
        stub2.restore();
        stub3.restore();
      });

      it('Deve retornar vazio/undefined', async () => {
        const result = await ContaService.deposit(1, 100);

        expect(result).to.equal(undefined);
      });
    });
  });

  describe('Método withdrawal', async () => {
    describe('Quando há saldo na conta para ser sacado', () => {
      let stub1: sinon.SinonStub;
      let stub2: sinon.SinonStub;
      let stub3: sinon.SinonStub;
  
      beforeEach(async () => {
        stub1 = sinon.stub(ContaModel, 'update').resolves(1);
        stub2 = sinon.stub(SaqueModel, 'create').resolves(1);
        stub3 = sinon.stub(ContaService, 'getById').resolves({ ...contaMock, saldo: 500 });
      });
  
      afterEach(async () => {
        stub1.restore();
        stub2.restore();
        stub3.restore();
      });

      it('Deve retornar vazio/undefined', async () => {
        const result = await ContaService.withdrawal(1, 100);

        expect(result).to.equal(undefined);
      });
    });

    describe('Quando não há saldo suficiente', () => {
      let stub1: sinon.SinonStub;
      let stub2: sinon.SinonStub;
      let stub3: sinon.SinonStub;
  
      beforeEach(async () => {
        stub1 = sinon.stub(ContaModel, 'update').resolves(1);
        stub2 = sinon.stub(SaqueModel, 'create').resolves(1);
        stub3 = sinon.stub(ContaService, 'getById').resolves({ ...contaMock, saldo: 10 });
      });
  
      afterEach(async () => {
        stub1.restore();
        stub2.restore();
        stub3.restore();
      });

      it('Uma excessão deve ser lançada com a mensagem "Saldo insuficiente"', async () => {
        await expect(ContaService.withdrawal(1, 100))
          .to.be.rejectedWith(HttpException, "Saldo insuficiente");
      });
    });
  });
});
