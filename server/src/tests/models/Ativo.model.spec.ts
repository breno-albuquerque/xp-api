import { expect } from 'chai';
import sinon from 'sinon';
import MyConnection from '../../database/MyConnection';
import AtivoModel from '../../models/Ativo.model';
import ativoMock from '../mocks/ativo.mock.spec';

const conn = MyConnection;

const clientAssetMock = {
  CodAtivo: 1,
  CodConta: 1,
  QtdeAtivo: 10,
  Simbolo: 'SYMBOL',
};

const createStub = (resolveValue: object): sinon.SinonStub => (
  sinon.stub(conn, 'run').resolves(resolveValue)
);

describe('Testa métodos da classe AtivoModel', () => {
  let stub: sinon.SinonStub;

  afterEach(async () => {
    stub.restore();
  });
  
  context('Método getById', () => {
    it('Ao ser passado um id válido, deve retornar o ativo correspondente', async () => {
      stub = createStub([ativoMock]);

      const result = await AtivoModel.getById(conn, 1);

      expect(result).to.equal(ativoMock);
    });

    it('Ao ser passado um id inválido, deve retornar undefined', async () => {
      stub = createStub([undefined]);

      const result = await AtivoModel.getById(conn, 10);

      expect(result).to.be.an('undefined');
    });
  });

  context('Método update', () => {
      it('Deve retornar 1, corresponsedente a uma linha afetada', async () => {
        stub = createStub({ affectedRows: 1 });

        const result = await AtivoModel.update(conn, 10, 100);
        expect(result).to.equal(1);
      });
    });

  context('Metódo getByCliente', () => {
    it('Deve retornar um array com objeto(s) que contém o CodConta, o CodAtivo, QtdeAtivo e Simbolo', async () => {
      stub = createStub([clientAssetMock]);
  
      const result = await AtivoModel
        .getByClient(conn, 1);

      expect(result).to.be.an('array');
      expect(result[0]).to.be.an('object');
      expect(result[0]).to.include.all.keys('CodAtivo', 'CodConta', 'QtdeAtivo', 'Simbolo');
    });
  });
  });
