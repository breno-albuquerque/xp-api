import chai, { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import sinon from 'sinon';
import ContaController from '../../controllers/Conta.controller';
import ContaService from '../../services/Conta.service';
import sinonChai from 'sinon-chai';

chai.should();
chai.use(sinonChai);

const contaMock = {
  id: 1,
  nome: 'Conta Mock',
  cpf: '11111111111',
  email: 'conta@mock.com',
  senha: '123456',
  saldo: 0
}

describe('Testa funções do ContaController', () => {
  describe('Função getById', async () => {
    let request: Partial<Request> = {
      params: { contaId: '1' }
    };
    let response: Partial<Response> = {
      json: sinon.stub().returns(contaMock),
      status: sinon.stub().returns(200)
    };
    let next = () => {};

    let stub = sinon.stub(ContaService, 'getById').resolves(contaMock);

    after(async () => { stub.restore() });

    it('É chamado o status da Response com código 200', async () => {
      await ContaController
        .getById(request as Request, response as Response, next as NextFunction);

      expect(response.status).to.have.been.calledWith(200);
    });
  });
});