import { expect } from "chai";
import sinon from "sinon";
import MyConnection from "../../database/MyConnection";
import DepositoModel from "../../models/Deposito.model";

describe('Testa métodos da classe DepositoModel em Conta.model.ts', () => {
  describe('Testa método create', () => {
    let stub: sinon.SinonStub;
  
    beforeEach(async () => {
      stub = sinon.stub(MyConnection, 'run').resolves({ insertId: 1 });
    });
  
    afterEach(async () => {
      stub.restore();
    });
  
    describe('Quando passa valores válidos', () => {
      it('Deve retornar o id do depósito criado', async () => {
        const result = await DepositoModel
          .create(MyConnection, [100, 1]);
  
        expect(result).to.be.a('number');
        expect(result).to.equal(1);
      });
    });
  });
});
