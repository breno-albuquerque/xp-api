import { expect } from 'chai';
import sinon from 'sinon';
import MyConnection from '../../database/MyConnection';
import ContaModel from '../../models/Conta.model';
import { newContaMock, contaMock } from '../mocks/conta.mock.spec';

const conn = MyConnection;

describe('Testa métodos da classe ContaModel em Conta.model.ts', () => {
  describe('Testa método create', () => {
    let stub: sinon.SinonStub;
  
    beforeEach(async () => {
      stub = sinon.stub(conn, 'run').resolves({ insertId: contaMock.id });
    });
  
    afterEach(async () => {
      stub.restore();
    });
  
    describe('Quando passa uma conta válida', () => {
      it('Deve retornar o id da conta inserida', async () => {
        const result = await ContaModel
          .create(conn, newContaMock);
  
        expect(result).to.be.a('number');
        expect(result).to.equal(1);
      });
    });
  });
  
  describe('Testa método getById', () => {
    describe('Quando passa um id existente', () => {
      let stub: sinon.SinonStub;
    
      beforeEach(async () => {
        stub = sinon.stub(conn, 'run').resolves([contaMock]);
      });
    
      afterEach(async () => {
        stub.restore();
      });
  
      it('Deve retornar a conta correspondente', async () => {
        const result = await ContaModel
          .getById(conn, 1);
  
        expect(result).to.equal(contaMock);
        expect(result.id).to.equal(1);
      });
    });
  
    describe('Quando passa um id inexistente', () => {
      let stub: sinon.SinonStub;
    
      beforeEach(async () => {
        stub = sinon.stub(conn, 'run').resolves([undefined]);
      });
    
      afterEach(async () => {
        stub.restore();
      });
  
      it('Deve retornar undefined', async () => {
        const result = await ContaModel
          .getById(conn, 100);
  
        expect(result).to.be.undefined;
      });
    });
  });
  
  describe('Testa o método getByEmail', () => {
    describe('Quando passa um email existente', () => {
      let stub: sinon.SinonStub;
    
      beforeEach(async () => {
        stub = sinon.stub(conn, 'run').resolves([contaMock]);
      });
    
      afterEach(async () => {
        stub.restore();
      });
  
      it('Deve retornar a conta correspondente', async () => {
        const result = await ContaModel
          .getByEmail(conn, 'conta@mock.com');
  
        expect(result).to.equal(contaMock);
        expect(result.email).to.equal('conta@mock.com');
      });
    });
  
    describe('Quando passa um email inexistente', () => {
      let stub: sinon.SinonStub;
    
      beforeEach(async () => {
        stub = sinon.stub(conn, 'run').resolves([undefined]);
      });
    
      afterEach(async () => {
        stub.restore();
      });
  
      it('Deve retornar undefined', async () => {
        const result = await ContaModel
          .getByEmail(conn, 'email@inexistente.com');
  
        expect(result).to.be.undefined;
      });
    });
  });

  describe('Testa o método update', () => {
    describe('Quando passa valores válidos', () => {
      let stub: sinon.SinonStub;
    
      beforeEach(async () => {
        stub = sinon.stub(conn, 'run').resolves({ affectedRows: 1 });
      });
    
      afterEach(async () => {
        stub.restore();
      });
  
      it('Deve retornar o número 1, correspondente a uma linha afetada', async () => {
        const result = await ContaModel
          .update(conn, [100, 1]);
  
        expect(result).to.be.an('number');
        expect(result).to.equal(1);
      });
    });
  });
});
