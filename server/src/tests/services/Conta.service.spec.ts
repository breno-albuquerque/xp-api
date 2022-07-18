import chai, { expect } from 'chai';
import ContaService from '../../services/Conta.service';
import ContaModel from '../../models/Conta.model';
import HttpException from '../../utils/http.exception';
import sinon from 'sinon';
import chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const contaMock = {
  id: 1,
  nome: 'Conta Mock',
  cpf: '11111111111',
  email: 'conta@mock.com',
  senha: '123456',
  saldo: 0
}

describe('Testa métodos da classe ContaService em Conta.service', () => {
  describe('Método getById', async () => {
    describe('Quando passa o id de uma conta existente', () => {
      let stub: sinon.SinonStub;
  
      beforeEach(async () => {
        stub = sinon.stub(ContaModel, 'getById').resolves(contaMock);
      });
  
      afterEach(async () => {
        stub.restore();
      });

      it('Deve retornar a conta correspondente', async () => {
        const result = await ContaService.getById(1);

        expect(result).to.equal(contaMock);
      });
    });

    describe('Quando passa o id de uma conta inexistente', () => {
      let stub: sinon.SinonStub;

      beforeEach(async () => {
        stub = sinon.stub(ContaModel, 'getById').resolves(undefined);
      });
  
      afterEach(async () => {
        stub.restore();
      });

      it('Uma excessão deve ser lançada com a mensagem "Conta não encontrada"', async () => {
        await expect(ContaService.getById(100))
          .to.be.rejectedWith(HttpException, 'Conta não encontrada');
      });
    });
  });
});
