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
  Valor: 30.00
}

describe('Testa funções do AtivoController', () => {
  describe('Função getById', async () => {
    let request: Partial<Request> = {
      params: { codAtivo: '1' }
    };
    let response: Partial<Response> = {
      json: sinon.stub().returns(fullAssetMock),
      status: sinon.stub().returns(200)
    };
    let next = () => {};

    let stub = sinon.stub(AtivoService, 'getById').resolves(fullAssetMock);

    after(async () => { stub.restore() });

    it('É chamado o status da Response com código 200', async () => {
      await AtivoController
        .getById(request as Request, response as Response, next as NextFunction);

      expect(response.status).to.have.been.calledWith(200);
    });
  });
});
