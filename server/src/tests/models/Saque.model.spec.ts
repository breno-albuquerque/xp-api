import { expect } from "chai";
import sinon from "sinon";
import MyConnection from "../../database/MyConnection";
import SaqueModel from "../../models/Saque.model";

describe('Testa métodos da classe SaqueModel em Conta.model.ts', () => {
  describe('Testa método create', () => {
    let stub: sinon.SinonStub;
  
    beforeEach(async () => {
      stub = sinon.stub(MyConnection, 'run').resolves({ insertId: 1 });
    });
  
    afterEach(async () => {
      stub.restore();
    });
  
    describe('Quando passa valores válidos', () => {
      it('Deve retornar o id do saque criado', async () => {
        const result = await SaqueModel
          .create(MyConnection, [100, 1]);
  
        expect(result).to.be.a('number');
        expect(result).to.equal(1);
      });
    })
  });
});