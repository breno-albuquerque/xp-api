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
});
