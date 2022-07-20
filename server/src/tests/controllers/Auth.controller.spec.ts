import chai, { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import AuthController from '../../controllers/Auth.controller';
import AuthService from '../../services/Auth.service';

chai.should();
chai.use(sinonChai);

const tokenMock = 'jwt-mock';

describe('Testa funções do AuthController', () => {
  describe('Função create', () => {
    const request = {};
    const response: Partial<Response> = {
      json: sinon.stub().returns(tokenMock),
      status: sinon.stub().returns(201),
    };
    const next = () => {};

    const stub = sinon.stub(AuthService, 'create').resolves(tokenMock);

    after(async () => { stub.restore(); });

    it('É chamado o status da Response com código 201', async () => {
      await AuthController
        .create(request as Request, response as Response, next as NextFunction);
      expect(response.status).to.have.been.calledWith(201);
    });
  });

  describe('Função login', () => {
    const stub = sinon.stub(AuthService, 'login').resolves(tokenMock);

    const request = {};
    const response: Partial<Response> = {
      json: sinon.stub().returns(tokenMock),
      status: sinon.stub().returns(200),
    };
    const next = () => {};

    after(async () => { stub.restore(); });

    it('É chamado o status da Response com código 200', async () => {
      await AuthController
        .login(request as Request, response as Response, next as NextFunction);
      expect(response.status).to.have.been.calledWith(200);
    });
  });
});
