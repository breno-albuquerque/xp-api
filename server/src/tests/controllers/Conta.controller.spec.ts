import chai, { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import sinon from 'sinon';
import ContaController from '../../controllers/Conta.controller';
import ContaService from '../../services/Conta.service';
import sinonChai from 'sinon-chai';
import { contaMock } from "../mocks/conta.mock.spec";

chai.should();
chai.use(sinonChai);

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

  describe('Função deposit', async () => {
    let request: Partial<Request> = {
      body: { CodCliente: '1', Valor: 100 }
    };
    let response: Partial<Response> = {
      status: sinon.stub().returns(201)
    };
    let next = () => {};

    let stub = sinon.stub(ContaService, 'deposit').resolves(undefined);

    after(async () => { stub.restore() });

    it('É chamado o status da Response com código 201', async () => {
      await ContaController
        .deposit(request as Request, response as Response, next as NextFunction);

      expect(response.status).to.have.been.calledWith(201);
    });
  });

  describe('Função withdrawal', async () => {
    let request: Partial<Request> = {
      body: { CodCliente: '1', Valor: 100 }
    };
    let response: Partial<Response> = {
      status: sinon.stub().returns(201)
    };
    let next = () => {};

    let stub = sinon.stub(ContaService, 'withdrawal').resolves(undefined);

    after(async () => { stub.restore() });

    it('É chamado o status da Response com código 201', async () => {
      await ContaController
        .withdrawal(request as Request, response as Response, next as NextFunction);

      expect(response.status).to.have.been.calledWith(201);
    });
  });
});
