import chai, { expect } from 'chai';
import sinon from 'sinon';
import chaiAsPromised = require('chai-as-promised');
import ContaService from '../../services/Conta.service';
import ContaModel from '../../models/Conta.model';
import HttpException from '../../utils/http.exception';
import { contaMock, newContaMock } from '../mocks/conta.mock.spec';
import SaqueModel from '../../models/Saque.model';
import DepositoModel from '../../models/Deposito.model';

chai.use(chaiAsPromised);

type ContaModelMethods = 'getById' | 'create' | 'getByEmail' | 'update';
type ContaServiceMethods = 'getById' | 'create' | 'getByEmail' | 'deposit' | 'withdrawal';

const createContaModelStub = (resolveValue: any, method: ContaModelMethods): sinon.SinonStub => (
  sinon.stub(ContaModel, method).resolves(resolveValue)
);
const createServiceStub = (resolveValue: any, method: ContaServiceMethods): sinon.SinonStub => (
  sinon.stub(ContaService, method).resolves(resolveValue)
);

describe('Testa métodos da classe ContaService', () => {
  let stub1: sinon.SinonStub;
  let stub2: sinon.SinonStub;
  let stub3: sinon.SinonStub;

  afterEach(() => {
    const stubs = [stub1, stub2, stub3];
    stubs.forEach((stub) => stub && stub.restore());
  });
  
  context('Método getById', () => {
    it('Ao ser passado um id válido, deve retornar a conta correspondente', async () => {
      stub1 = createContaModelStub(contaMock, 'getById');
      
      const result = await ContaService.getById(1);
      expect(result).to.equal(contaMock);
    });

    it('Ao ser passado um id inválido,uma excessão deve ser lançada: "Conta não encontrada"', async () => {
      stub1 = createContaModelStub(undefined, 'getById');

      await expect(ContaService.getById(100))
        .to.be.rejectedWith(HttpException, 'Conta não encontrada');
    });
  });

  context('Método deposit', () => {
    it('Deve retornar vazio/undefined', async () => {
      stub1 = createContaModelStub(1, 'update');
      stub2 = sinon.stub(DepositoModel, 'create').resolves(1);
      stub3 = createServiceStub(contaMock, 'getById');

      const result = await ContaService.deposit(1, 100);
      expect(result).to.equal(undefined);
    });
  });

  context('Método withdrawal', () => {
    it('Quando há saldo suficiente, deve retornar undefined', async () => {
      stub1 = createContaModelStub(1, 'update');
      stub2 = sinon.stub(SaqueModel, 'create').resolves(1);
      stub3 = createServiceStub({ ...contaMock, Saldo: 500 }, 'getById');

      const result = await ContaService.withdrawal(1, 100);
      expect(result).to.equal(undefined);
    });
  
    it('Quando não há saldo suficiente, uma excessão deve ser lançada com a mensagem "Saldo insuficiente"', async () => {
      stub1 = createContaModelStub(1, 'update');
      stub2 = sinon.stub(SaqueModel, 'create').resolves(1);
      stub3 = createServiceStub({ ...contaMock, saldo: 10 }, 'getById');

      await expect(ContaService.withdrawal(1, 100))
        .to.be.rejectedWith(HttpException, 'Saldo insuficiente');
    });
  });

  context('Método create', () => {
    it('Deve retornar o id da conta inserida', async () => {
      stub1 = createContaModelStub(1, 'create');

      const result = await ContaService
        .create(newContaMock);

      expect(result).to.be.a('number');
      expect(result).to.equal(1);
    });
  });

  context('Método getByEmail', () => {
    it('Deve retornar a conta correspondente', async () => {
      stub1 = createContaModelStub(contaMock, 'create');

      const result = await ContaService
        .create(newContaMock);

      expect(result).to.include.all.keys('Id', 'Nome', 'Cpf', 'Email', 'Senha', 'Saldo');
    });
  });
});
