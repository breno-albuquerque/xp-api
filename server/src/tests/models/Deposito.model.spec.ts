import { expect } from 'chai';
import sinon from 'sinon';
import MyConnection from '../../database/MyConnection';
import DepositoModel from '../../models/Deposito.model';

const conn = MyConnection;

const createStub = (resolveValue: object): sinon.SinonStub => (
  sinon.stub(conn, 'run').resolves(resolveValue)
);

describe('Testa métodos da classe DepositoModel', () => {
  let stub: sinon.SinonStub;

  afterEach(() => {
    stub.restore();
  });

  context('Método create', () => {
    it('Deve retornar o id do depósito inserido', async () => {
      stub = createStub({ insertId: 1 });

      const result = await DepositoModel
        .create(MyConnection, [100, 1]);

      expect(result).to.be.a('number');
      expect(result).to.equal(1);
    });
  });
});
