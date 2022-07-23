import chai, { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import AtivoService from '../../services/Ativo.service';
import AtivoController from '../../controllers/Ativo.controller';

chai.should();
chai.use(sinonChai);

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

  afterEach(() => {
    stub.restore();
  });

  context('Função getById', () => {
    it('É chamado o status da Response com código 200 e o Ativo correspondente no json', async () => {
      stub = sinon
        .stub(AtivoService, 'getById')
        .resolves({
          CodAtivo: 1,
          QtdeAtivo: 100,
          Simbolo: 'SYMBOL',
          Valor: 30,
        });
      request.params = { codAtivo: '1' };
  
      await AtivoController
        .getById(request as Request, response as Response, next as NextFunction);

      expect(response.status).to.have.been.calledWith(200);
    });
  });

  context('Função getByClient', () => {
    it('É chamado o status da Response com código 200 e o array de ativos no json', async () => {
      stub = sinon
        .stub(AtivoService, 'getByClient')
        .resolves([{
          CodCliente: 1,
          CodAtivo: 1,
          QtdeAtivo: 100,
          Simbolo: 'SYMBOL',
          Valor: 30,
        }]);

      await AtivoController
        .getByClient(request as Request, response as Response, next as NextFunction);

      expect(response.status).to.have.been.calledWith(200);
    });
  });
});
