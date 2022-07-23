import chai, { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import AuthController from '../../controllers/Auth.controller';
import AuthService from '../../services/Auth.service';

chai.should();
chai.use(sinonChai);

const tokenMock = 'jwt-mock';

const statusJsonSpy = sinon.spy();
const sandbox = sinon.createSandbox();

let response: Partial<Response>;

const request: Partial<Request> = {
  params: { param: 'temp' },
};

const next = () => {};

describe('Testa funções do AuthController', () => {
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

  context('Função register', () => {
    it('É chamado o status da Response com código 201', async () => {
       stub = sinon
        .stub(AuthService, 'register')
        .resolves(1);
      
      await AuthController
        .register(request as Request, response as Response, next as NextFunction);

      expect(response.status).to.have.been.calledWith(201);
    });
  });

  context('Função login', () => {
    it('É chamado o status da Response com código 200', async () => {
       stub = sinon
        .stub(AuthService, 'login')
        .resolves(tokenMock);

      await AuthController
        .login(request as Request, response as Response, next as NextFunction);

      expect(response.status).to.have.been.calledWith(200);
    });
  });
});
