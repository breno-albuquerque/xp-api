import { expect } from 'chai';
import sinon from 'sinon';
import MyConnection from '../../database/MyConnection';
import AtivoModel from '../../models/Ativo.model';
import { ativoMock } from '../mocks/ativo.mock.spec';

const conn = MyConnection;

describe('Testa métodos da classe AtivoModel em Ativo.model.ts', () => {
  describe('Método getById', () => {
    describe('Quando passa um id válido', () => {
      let stub: sinon.SinonStub;

      beforeEach(async () => {
        stub = sinon.stub(conn, 'run').resolves([ativoMock]);
      });

      afterEach(async () => {
        stub.restore();
      });

      it('Deve retornar o ativo correspondente', async () => {
        const result = await AtivoModel.getById(conn, 1);

        expect(result).to.equal(ativoMock);
      });
    });
  });
});
