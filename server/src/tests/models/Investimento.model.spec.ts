import { expect } from 'chai';
import sinon from 'sinon';
import MyConnection from '../../database/MyConnection';
import InvestimentoModel from '../../models/Investimento.model';
import investimentoMock from '../mocks/investimento.mock.spec';

const conn = MyConnection;

const createStub = (resolveValue: object): sinon.SinonStub => (
  sinon.stub(conn, 'run').resolves(resolveValue)
);

describe('Testa métodos da classe InvestimentoModel', () => {
  let stub: sinon.SinonStub;

  afterEach(() => {
    stub.restore();
  });

  context('Método create', () => {
    it('Deve retornar o id do investimento criado', async () => {
      stub = createStub({ insertId: 1 });

      const result = await InvestimentoModel
        .create(conn, investimentoMock);

      expect(result).to.be.a('number');
      expect(result).to.equal(1);
    });
  });

  context('Método update', () => {
    it('Deve retornar 1, correspondente a uma linha afetada', async () => {
      stub = createStub({ affectedRows: 1 });

      const result = await InvestimentoModel
        .update(conn, investimentoMock);

      expect(result).to.be.a('number');
      expect(result).to.equal(1);
    });
  });

  context('Método delete', () => {
    it('Deve retornar 1, correspondente a uma linha afetada', async () => {
      stub = createStub({ affectedRows: 1 });

      const result = await InvestimentoModel
        .delete(MyConnection, 1, 1);

      expect(result).to.be.a('number');
      expect(result).to.equal(1);
    });
  });

  context('Método getOne', () => {
    it('Ao serem passados valores válidos, deve retornar o investimento correspondente', async () => {
      stub = createStub([investimentoMock]);

      const result = await InvestimentoModel
        .getOne(MyConnection, investimentoMock);

      expect(result).to.be.an('object');
      expect(result).to.contain.all.keys('CodCliente', 'CodAtivo', 'QtdeAtivo');
      expect(result.CodCliente).to.equal(1);
      expect(result.CodAtivo).to.equal(1);
      expect(result.QtdeAtivo).to.equal(10);
    });

    it('Ao serem passados valores inválidos, deve retornar undefined', async () => {
      stub = createStub([undefined]);

      const result = await InvestimentoModel
        .getOne(MyConnection, { CodCliente: 0, CodAtivo: 0, QtdeAtivo: 0 });

      expect(result).to.be.an('undefined');
    });
  });
});
