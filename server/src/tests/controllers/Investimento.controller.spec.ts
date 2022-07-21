import chai, { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import InvestimentoController from '../../controllers/Investimento.controller';
import InvestimentoService from '../../services/Investimento.service';

chai.should();
chai.use(sinonChai);

const statusJsonSpy = sinon.spy();
const sandbox = sinon.createSandbox();

let response: Partial<Response>;

const request: Partial<Request> = {
  params: { param: 'temp' },
};

const next = () => {};

describe('Testa funções do InvestimentoController', () => {
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

  context('Função purchase', () => {
    it('É chamado o status da Response com código 201', async () => {
       stub = sinon
        .stub(InvestimentoService, 'purchase')
        .resolves(undefined);
      
      await InvestimentoController
        .purchase(request as Request, response as Response, next as NextFunction);

      expect(response.status).to.have.been.calledWith(201);
    });
  });

  context('Função sale', () => {
    it('É chamado o status da Response com código 201', async () => {
       stub = sinon
        .stub(InvestimentoService, 'sale')
        .resolves(undefined);

      await InvestimentoController
        .sale(request as Request, response as Response, next as NextFunction);

      expect(response.status).to.have.been.calledWith(201);
    });
  });
});
