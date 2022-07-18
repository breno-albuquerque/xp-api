import { expect } from "chai";
import sinon from "sinon";

import ContaModel from "../../models/Conta.model";
import MyConnection from "../../database/MyConnection";

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
    stub = sinon.stub(MyConnection, 'run').resolves([{ insertId: contaMock.id }]);
  });

  afterEach(async () => {
    stub.restore();
  });

  it('Deve retornar o id da conta inserida', async () => {
    const [result] = await MyConnection
      .run(MyConnection.queries.createConta, Object.values(newContaMock));

    expect(result.insertId).to.equal(1);
  });
});

