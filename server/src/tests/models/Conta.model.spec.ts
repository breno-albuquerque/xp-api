import { expect } from 'chai';
import sinon from 'sinon';
import MyConnection from '../../database/MyConnection';
import ContaModel from '../../models/Conta.model';
import { newContaMock, contaMock } from '../mocks/conta.mock.spec';

const conn = MyConnection;

const createStub = (resolveValue: object): sinon.SinonStub => (
  sinon.stub(conn, 'run').resolves(resolveValue)
);

describe('Testa métodos da classe ContaModel', () => {
  let stub: sinon.SinonStub;

  afterEach(() => {
    stub.restore();
  });

  context('Método create', () => {
    it('Deve retornar o id da conta inserida', async () => {
      stub = createStub({ insertId: contaMock.Id });
      
      const result = await ContaModel
        .create(conn, newContaMock);

      expect(result).to.be.a('number');
      expect(result).to.equal(1);
    });
  });
  
  context('Método getById', () => {
    it('Ao ser passado um id válido, deve retornar a conta correspondente', async () => {
      stub = createStub([contaMock]);

      const result = await ContaModel
        .getById(conn, 1);

      expect(result).to.equal(contaMock);
      expect(result.Id).to.equal(1);
    });

    it('Ao ser passado um id inválido, deve retornar undefined', async () => {
      stub = createStub([undefined]);

      const result = await ContaModel
        .getById(conn, 100);

      expect(result).to.be.an('undefined');
  });
});
  
  context('Método getByEmail', () => { 
      it('Ao ser passado um email cadastrado, deve retornar a conta correspondente', async () => {
        stub = createStub([contaMock]);

        const result = await ContaModel
          .getByEmail(conn, 'conta@mock.com');
  
        expect(result).to.equal(contaMock);
        expect(result.Email).to.equal('conta@mock.com');
      });
  
      it('Ao ser passado um email não cadastrado, deve retornar undefined', async () => {
        stub = createStub([undefined]);

        const result = await ContaModel
          .getByEmail(conn, 'email@inexistente.com');
  
        expect(result).to.be.an('undefined');
      });
  });

  context('Método update', () => {
      it('Deve retornar 1, correspondente a uma linha afetada', async () => {
        stub = createStub({ affectedRows: 1 });

        const result = await ContaModel
          .update(conn, 100, 1);
  
        expect(result).to.be.an('number');
        expect(result).to.equal(1);
      });
    });
  });
