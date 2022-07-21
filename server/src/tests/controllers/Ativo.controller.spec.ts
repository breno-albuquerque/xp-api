import chai, { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import AtivoService from '../../services/Ativo.service';
import AtivoController from '../../controllers/Ativo.controller';

chai.should();
chai.use(sinonChai);

const fullAssetMock = {
  CodAtivo: 1,
  QtdeAtivo: 100,
  Valor: 30.00,
};

//  Referência: Solução para criar spy de Request e Response com Typescript

//  https://jonathanwatsonwebdevelopment.medium.com/how-to-unit-test-express-controllers-with-mocha-and-chai-5cb425c5c7db
const statusJsonSpy = sinon.spy();

const response: Partial<Response> = {
  json: sinon.spy(),
  status: sinon.stub().returns({ json: statusJsonSpy }),
};

const request: Partial<Request> = {
  params: { param: 'temp' },
};

const next = () => {};

describe('Testa funções do AtivoController', () => {
  let stub: sinon.SinonStub;

  after(() => {
    stub.restore();
  });

  context('Função getById', () => {
    it('É chamado o status da Response com código 200 e o Ativo correspondente no json', async () => {
      stub = sinon
        .stub(AtivoService, 'getById')
        .resolves(fullAssetMock);
      request.params = { codAtivo: '1' };
  
      await AtivoController
        .getById(request as Request, response as Response, next as NextFunction);

      expect(response.status).to.have.been.calledWith(200);
    });
  });
});
