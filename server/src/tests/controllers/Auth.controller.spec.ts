import chai, { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import sinon from 'sinon';
import AuthController from '../../controllers/Auth.controller';
import AuthService from '../../services/Auth.service';
import sinonChai from 'sinon-chai';

const newContaMock = {
  nome: 'Conta Mock',
  cpf: '11111111111',
  email: 'conta@mock.com',
  senha: '123456'
}

const tokenMock = 'jwt-mock';
chai.should();
chai.use(sinonChai);


describe('Testa funções do AuthController', () => {
  describe('Função create', async () => {
    let stub = sinon.stub(AuthService, 'create').resolves(tokenMock);

    let response: Partial<Response> = {
      json: sinon.stub().returns(tokenMock),
      status: sinon.stub().returns(201)
    };
    let request = {};
    let next = () => {};
  
    after(async () => {
      stub.restore()
    });

    it('É chamado o status da Response com código 201', async () => {
      await AuthController.create(request as Request, response as Response, next as NextFunction);
      expect(response.status).calledWith(201)  
    });
  });

  describe('Função login', async () => {
    let stub = sinon.stub(AuthService, 'login').resolves(tokenMock);
    let response: Partial<Response> = {
      json: sinon.stub().returns(tokenMock),
      status: sinon.stub().returns(200)
    };
    let request = {};
    let next = () => {};

    after(async () => {
      stub.restore()
    });

    it('É chamado o status da Response com código 200', async () => {
      await AuthController.login(request as Request, response as Response, next as NextFunction);
      expect(response.status).calledWith(200);
    });
  });
});
