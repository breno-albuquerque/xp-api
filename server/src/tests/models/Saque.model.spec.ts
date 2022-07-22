import { expect } from 'chai';
import sinon from 'sinon';
import MyConnection from '../../database/connections/MyConnection';
import SaqueModel from '../../models/Saque.model';

const conn = MyConnection;

const createStub = (resolveValue: object): sinon.SinonStub => (
  sinon.stub(conn, 'run').resolves(resolveValue)
);

describe('Testa métodos da classe SaqueModel', () => {
  let stub: sinon.SinonStub;

  afterEach(() => {
    stub.restore();
  });
  
  context('Método create', () => {
    it('Deve retornar o id do saque inserido', async () => {
      stub = createStub({ insertId: 1 });

      const result = await SaqueModel
        .create(MyConnection, [100, 1]);

      expect(result).to.be.a('number');
      expect(result).to.equal(1);
    });
  });
});
