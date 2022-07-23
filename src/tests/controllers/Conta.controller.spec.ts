import chai, { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import ContaController from '../../controllers/Conta.controller';
import ContaService from '../../services/Conta.service';
import { contaMock } from '../mocks/conta.mock.spec';

chai.should();
chai.use(sinonChai);

const statusJsonSpy = sinon.spy();
const sandbox = sinon.createSandbox();

let response: Partial<Response>;

const request: Partial<Request> = {
  params: { param: 'temp' },
};

const next = () => {};

describe('Testa funções do ContaController', () => {
  let stub: sinon.SinonStub;

  beforeEach(() => {
    response = {
      json: sinon.spy(),
      status: sandbox.stub().returns({ json: statusJsonSpy }),
    };
  });

  afterEach(() => {
    stub.restore();
    sandbox.restore();
  });

  context('Função getById', () => {
    it('É chamado o status da Response com código 200', async () => {
      stub = sinon
        .stub(ContaService, 'getById')
        .resolves(contaMock);
      request.params = { CodAtivo: '1' };

      await ContaController
        .getById(request as Request, response as Response, next as NextFunction);

      expect(response.status).to.have.been.calledWith(200);
    });
  });

  context('Função deposit', () => {
    it('É chamado o status da Response com código 201', async () => {
      stub = sinon
        .stub(ContaService, 'deposit')
        .resolves(undefined);
      request.body = { CodCliente: '1', Valor: 100 };

      await ContaController
        .deposit(request as Request, response as Response, next as NextFunction);

      expect(response.status).to.have.been.calledWith(201);
    });
  });

  context('Função withdrawal', () => {
    it('É chamado o status da Response com código 201', async () => {
      stub = sinon
        .stub(ContaService, 'withdrawal')
        .resolves(undefined);
      request.body = { CodCliente: '1', Valor: 100 };

      await ContaController
        .withdrawal(request as Request, response as Response, next as NextFunction);

      expect(response.status).to.have.been.calledWith(201);
    });
  });
});
