import { expect } from "chai";
import sinon from 'sinon';
import AtivoModel from "../../models/Ativo.model";
import AtivoService from "../../services/Ativo.service";
import { ativoMock } from "../mocks/ativo.mock.spec";

const fullAssetMock = {
  CodAtivo: 1,
  QtdeAtivo: 100,
  Valor: 30.00
}

describe('Testa métodos da classe AtivoService em Ativo.service', () => {
  describe('Método getById', () => {
    describe('Quando passa um id válido', () => {
      let stub1: sinon.SinonStub;
      let stub2: sinon.SinonStub;

      beforeEach(async () => {
        stub1 = sinon.stub(AtivoModel, 'getById').resolves(ativoMock);
        stub2 = sinon.stub(AtivoService, 'getValue').resolves(30.00)
      });

      afterEach(async () => {
        stub1.restore();
        stub2.restore();
      })

      it('Deve retornar um objeto no formato correto', async () => {
        const result = await AtivoService.getById(1)
        expect(result).to.be.an('object');
        expect(result).to.include.all.keys('CodAtivo', 'QtdeAtivo', 'Valor');
        expect(result.CodAtivo).to.equal(1);
        expect(result.QtdeAtivo).to.equal(100);
        expect(result.Valor).to.equal(30.00);
      });
    });
  });
});