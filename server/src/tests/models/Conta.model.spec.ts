import { expect } from "chai";
import sinon from "sinon";

import MyConnection from "../../database/MyConnection";
import ContaModel from "../../models/Conta.model";

const newContaMock = {
  nome: 'Conta Mock',
  cpf: '11111111111',
  email: 'conta@mock.com',
  senha: '123456'
}
const contaMock = {
  id: 1,
  nome: 'Conta Mock',
  cpf: '11111111111',
  email: 'conta@mock.com',
  senha: '123456',
  saldo: 0
}

describe('Testa método create', () => {
  let stub: sinon.SinonStub;

  beforeEach(async () => {
    stub = sinon.stub(MyConnection, 'run').resolves({ insertId: contaMock.id });
  });

  afterEach(async () => {
    stub.restore();
  });

  describe('Quando passa uma conta válida', () => {
    it('Deve retornar o id da conta inserida', async () => {
      const result = await ContaModel
        .create(MyConnection.queries.createConta, newContaMock);

      expect(result).to.be.a('number');
      expect(result).to.equal(1);
    });
  })
});

describe('Testa método getById', () => {
  describe('Quando passa um id existente', () => {
    let stub: sinon.SinonStub;
  
    beforeEach(async () => {
      stub = sinon.stub(MyConnection, 'run').resolves([contaMock]);
    });
  
    afterEach(async () => {
      stub.restore();
    });

    it('Deve retornar a conta correspondente', async () => {
      const result = await ContaModel
        .getById(MyConnection.queries.getById, 1);

      expect(result).to.equal(contaMock);
      expect(result.id).to.equal(1);
    });
  });

  describe('Quando passa um id inexistente', () => {
    let stub: sinon.SinonStub;
  
    beforeEach(async () => {
      stub = sinon.stub(MyConnection, 'run').resolves([undefined]);
    });
  
    afterEach(async () => {
      stub.restore();
    });

    it('Deve retornar undefined', async () => {
      const result = await ContaModel
        .getById(MyConnection.queries.getById, 100);

      expect(result).to.be.undefined;
    });
  });
});

describe('Testa o método getByEmail', () => {
  describe('Quando passa um email existente', () => {
    let stub: sinon.SinonStub;
  
    beforeEach(async () => {
      stub = sinon.stub(MyConnection, 'run').resolves([contaMock]);
    });
  
    afterEach(async () => {
      stub.restore();
    });

    it('Deve retornar a conta correspondente', async () => {
      const result = await ContaModel
        .getByEmail(MyConnection.queries.getById, 'conta@mock.com');

      expect(result).to.equal(contaMock);
      expect(result.email).to.equal('conta@mock.com');
    });
  });

  describe('Quando passa um email inexistente', () => {
    let stub: sinon.SinonStub;
  
    beforeEach(async () => {
      stub = sinon.stub(MyConnection, 'run').resolves([undefined]);
    });
  
    afterEach(async () => {
      stub.restore();
    });

    it('Deve retornar undefined', async () => {
      const result = await ContaModel
        .getByEmail(MyConnection.queries.getById,'email@inexistente.com');

      expect(result).to.be.undefined;
    });
  });
})