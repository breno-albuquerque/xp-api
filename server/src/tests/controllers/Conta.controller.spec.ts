import chai, { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import ContaController from '../../controllers/Conta.controller';
import ContaService from '../../services/Conta.service';
import { contaMock } from '../mocks/conta.mock.spec';

chai.should();
chai.use(sinonChai);

describe('Testa funções do ContaController', () => {
  describe('Função getById', () => {
    const request: Partial<Request> = {
      params: { contaId: '1' },
    };
    const response: Partial<Response> = {
      json: sinon.stub().returns(contaMock),
      status: sinon.stub().returns(200),
    };
    const next = () => {};

    const stub = sinon.stub(ContaService, 'getById').resolves(contaMock);

    after(async () => { stub.restore(); });

    it('É chamado o status da Response com código 200', async () => {
      await ContaController
        .getById(request as Request, response as Response, next as NextFunction);

      expect(response.status).to.have.been.calledWith(200);
    });
  });

  describe('Função deposit', () => {
    const request: Partial<Request> = {
      body: { CodCliente: '1', Valor: 100 },
    };
    const response: Partial<Response> = {
      status: sinon.stub().returns(201),
    };
    const next = () => {};

    const stub = sinon.stub(ContaService, 'deposit').resolves(undefined);

    after(async () => { stub.restore(); });

    it('É chamado o status da Response com código 201', async () => {
      await ContaController
        .deposit(request as Request, response as Response, next as NextFunction);

      expect(response.status).to.have.been.calledWith(201);
    });
  });

  describe('Função withdrawal', () => {
    const request: Partial<Request> = {
      body: { CodCliente: '1', Valor: 100 },
    };
    const response: Partial<Response> = {
      status: sinon.stub().returns(201),
    };
    const next = () => {};

    const stub = sinon.stub(ContaService, 'withdrawal').resolves(undefined);

    after(async () => { stub.restore(); });

    it('É chamado o status da Response com código 201', async () => {
      await ContaController
        .withdrawal(request as Request, response as Response, next as NextFunction);

      expect(response.status).to.have.been.calledWith(201);
    });
  });
});
