import { expect } from "chai";
import sinon from 'sinon';
import MyConnection from "../../database/MyConnection";
import InvestimentoModel from "../../models/Investimento.model";


const investimentoMock = {
  contaId: 1,
  ativoId: 1,
  quantidade: 10
}

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

      it('Deve retornar o número do id do investimento criado', async () => {
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

      it('Deve retornar o número de linhas afetadas', async () => {
        const result = await InvestimentoModel.update(MyConnection, 1, 1, 10);

        expect(result).to.be.a('number');
        expect(result).to.equal(1);
      });
    });
  });

  describe('Método delete', () => {
    describe('Quando passa valores válidos', () => {
      let stub: sinon.SinonStub;

      beforeEach(async () => {
        stub = sinon.stub(conn, 'run').resolves({ affectedRows: 1 });
      });

      afterEach(async () => {
        stub.restore();
      })

      it('Deve retornar o número de linhas afetadas', async () => {
        const result = await InvestimentoModel.delete(MyConnection, 1, 1);

        expect(result).to.be.a('number');
        expect(result).to.equal(1);
      });
    });
  });

  describe('Método getOne', () => {
    describe('Quando passa valores válidos', () => {
      let stub: sinon.SinonStub;

      beforeEach(async () => {
        stub = sinon.stub(conn, 'run').resolves([investimentoMock]);
      });

      afterEach(async () => {
        stub.restore();
      })

      it('Deve retornar o investimento correspondente', async () => {
        const result = await InvestimentoModel.getOne(MyConnection, 1, 1);

        expect(result).to.be.an('object');
        expect(result).to.contain.all.keys('contaId', 'ativoId', 'quantidade');
        expect(result.contaId).to.equal(1);
        expect(result.ativoId).to.equal(1);
        expect(result.quantidade).to.equal(10);
      });
    });
  });
});
