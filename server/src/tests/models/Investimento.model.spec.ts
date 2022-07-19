import { expect } from "chai";
import sinon from 'sinon';
import MyConnection from "../../database/MyConnection";
import InvestimentoModel from "../../models/Investimento.model";

const conn = MyConnection;

describe('Testa métodos da classe InvestimentoModel em Investimento.model.ts', () => {
  describe('Método create', () => {
    describe('Quando passa valores válidos', () => {
      let stub: sinon.SinonStub;

      beforeEach(async () => {
        stub = sinon.stub(conn, 'run').resolves({ insertId: 1 });
      });

      afterEach(async () => {
        stub.restore();
      })

      it('Deve retornar o ativo correspondente', async () => {
        const result = await InvestimentoModel.create(MyConnection, 1, 1, 10);

        expect(result).to.be.a('number');
        expect(result).to.equal(1);
      });
    });
  });

  describe('Método update', () => {
    describe('Quando passa valores válidos', () => {
      let stub: sinon.SinonStub;

      beforeEach(async () => {
        stub = sinon.stub(conn, 'run').resolves({ affectedRows: 1 });
      });

      afterEach(async () => {
        stub.restore();
      })

      it('Deve retornar o ativo correspondente', async () => {
        const result = await InvestimentoModel.update(MyConnection, 1, 1, 10);

        expect(result).to.be.a('number');
        expect(result).to.equal(1);
      });
    });
  });

  describe('Método update', () => {
    describe('Quando passa valores válidos', () => {
      let stub: sinon.SinonStub;

      beforeEach(async () => {
        stub = sinon.stub(conn, 'run').resolves({ affectedRows: 1 });
      });

      afterEach(async () => {
        stub.restore();
      })

      it('Deve retornar o ativo correspondente', async () => {
        const result = await InvestimentoModel.delete(MyConnection, 1, 1);

        expect(result).to.be.a('number');
        expect(result).to.equal(1);
      });
    });
  });
});
