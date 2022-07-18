import chai, { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import sinon from 'sinon';
import AuthController from '../../controllers/Auth.controller';
import AuthService from '../../services/Auth.service';
import sinonChai from 'sinon-chai';

chai.should();
chai.use(sinonChai);

const tokenMock = 'jwt-mock';

describe('Testa funções do AuthController', () => {
  describe('Função create', async () => {
    let request = {};
    let response: Partial<Response> = {
      json: sinon.stub().returns(tokenMock),
      status: sinon.stub().returns(201)
    };
    let next = () => {};

    let stub = sinon.stub(AuthService, 'create').resolves(tokenMock);

    after(async () => { stub.restore() });

    it('É chamado o status da Response com código 201', async () => {
      await AuthController
        .create(request as Request, response as Response, next as NextFunction);
      expect(response.status).to.have.been.calledWith(201);
    });
  });

  describe('Função login', async () => {
    let stub = sinon.stub(AuthService, 'login').resolves(tokenMock);

    let request = {};
    let response: Partial<Response> = {
      json: sinon.stub().returns(tokenMock),
      status: sinon.stub().returns(200)
    };
    let next = () => {};

    after(async () => { stub.restore() });

    it('É chamado o status da Response com código 200', async () => {
      await AuthController
        .login(request as Request, response as Response, next as NextFunction);
      expect(response.status).to.have.been.calledWith(200);
    });
  });
});
