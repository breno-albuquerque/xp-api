import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import AtivoModel from '../../models/Ativo.model';
import AtivoService from '../../services/Ativo.service';
import HttpException from '../../utils/http.exception';
import ativoMock from '../mocks/ativo.mock.spec';

chai.use(chaiAsPromised);

type AtivoModelMethods = 'getById' | 'update';

const createAtivoModelStub = (resolveValue: any, method: AtivoModelMethods): sinon.SinonStub => (
  sinon.stub(AtivoModel, method).resolves(resolveValue)
);

describe('Testa métodos da classe AtivoService em Ativo.service', () => {
  let stub1: sinon.SinonStub;
  let stub2: sinon.SinonStub;

  afterEach(async () => {
    stub1.restore();
    stub2.restore();
  });

  context('Método getById', () => {
    it('Ao ser passado um id válido, deve retornar um objeto no formato correto', async () => {
      stub1 = createAtivoModelStub(ativoMock, 'getById');
      stub2 = sinon.stub(AtivoService, 'getValue').resolves(30.00);

      const result = await AtivoService.getById(1);

      expect(result).to.be.an('object');
      expect(result).to.include.all.keys('CodAtivo', 'QtdeAtivo', 'Valor');
      expect(result.CodAtivo).to.equal(1);
      expect(result.QtdeAtivo).to.equal(100);
      expect(result.Valor).to.equal(30.00);
    });

    it('Ao ser passado um id inválido, uma excessão deve ser lançada: "Ativo não encontrado"', async () => {
      stub1 = createAtivoModelStub(undefined, 'getById');

      await expect(AtivoService.getById(100))
        .to.be.rejectedWith(HttpException, 'Ativo não encontrado');
    });
  });

  context('Método updateWhenBought', () => {
    it('Quando a quantidade a ser comprada é maior do que a disponível, uma excessão deve ser lançada: "Quantidade indisponível"', async () => {
      stub1 = createAtivoModelStub(ativoMock, 'getById');

      await expect(AtivoService.updateWhenBought(1, 101))
        .to.be.rejectedWith(HttpException, 'Quantidade indisponível');
    });

    it('Quando a quantidade a ser comprada é menor do que a disponível deve retornar undefined (void)', async () => {
      stub1 = createAtivoModelStub(ativoMock, 'getById');
      stub2 = createAtivoModelStub({ affectedRows: 1 }, 'update');

      const result = await AtivoService
        .updateWhenBought(1, 50);

      expect(result).to.be.an('undefined');
    });
  });

  context('Método updateWhenSold', () => {
    it('Deve retornar undefined (void)', async () => {
      stub1 = createAtivoModelStub(ativoMock, 'getById');
      stub2 = createAtivoModelStub({ affectedRows: 1 }, 'update');

      const result = await AtivoService
        .updateWhenSold(1, 10);

      expect(result).to.be.an('undefined');
    });
  });
});
