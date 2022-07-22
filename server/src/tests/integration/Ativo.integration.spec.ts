/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable mocha/max-top-level-suites */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import server from '../../app';
import MyConnection from '../../database/connections/MyConnection';
import AtivoService from '../../services/Ativo.service';
import { ativoMock, clientsAtivoMock } from '../mocks/ativo.mock.spec';

import jwt from '../../utils/jwt.token';
import { contaMock } from '../mocks/conta.mock.spec';

const conn = MyConnection;

chai.use(chaiHttp);

const createStub = (resolveValue: object): sinon.SinonStub => (
  sinon.stub(conn, 'run').resolves(resolveValue)
);

let response: any;
let stub1: sinon.SinonStub;
let stub2: sinon.SinonStub;

describe('Integração /ativos/all - getAll', () => {
  afterEach(async () => {
    stub1.restore();
  });

  beforeEach(async () => {
    stub1 = createStub([ativoMock]);
    response = await chai
      .request(server)
      .get('/ativos/all');
  });

  it('Deve retornar código status 200', () => {
    expect(response).to.have.status(200);
  });

  it('Deve retornar um array com objetos representando os ativos disponíveis', () => {
    expect(response.body).to.be.an('array');
    expect(response.body[0]).to.be.an('object');
    expect(response.body[0]).to.include.all.keys('Id', 'Simbolo', 'QtdeAtivo');
  });
});

describe('Integração /ativo/:id - getById', () => {
  beforeEach(async () => {
    stub1 = createStub([ativoMock]);
    stub2 = sinon
      .stub(AtivoService, 'getValue')
      .resolves(30);

    response = await chai
      .request(server)
      .get('/ativos/1');
  });

  afterEach(async () => {
    stub1.restore();
    stub2.restore();
  });
  
  it('Deve retornar o código status 200', () => {
    expect(response).to.have.status(200);
  });
  
  it('Deve retornar um único objeto representando o ativo', () => {
    expect(response.body).to.be.an('object');
    expect(response.body).to.include.all.keys('CodAtivo', 'Simbolo', 'QtdeAtivo', 'Valor');
    expect(response.body.CodAtivo).to.equal(1);
    expect(response.body.Valor).to.equal(30);
  });
});

describe('Integração /ativo/cliente/:id - getByCliente', () => {
  beforeEach(async () => {
    stub1 = createStub([clientsAtivoMock]);
    stub2 = sinon
      .stub(AtivoService, 'getValue')
      .resolves(30);

    response = await chai
      .request(server)
        .get('/ativos/cliente/1')
        .set('Authorization', `Baerer ${jwt.generateToken(contaMock)}`);
  });

  afterEach(async () => {
    stub1.restore();
    stub2.restore();
  });
  
  it('Deve retornar o código status 200', () => {
    expect(response).to.have.status(200);
  });
  
  it('Deve retornar um array de objetos com os ativos do cliente', () => {
    expect(response.body).to.be.an('array');
    expect(response.body[0]).to.be.an('object');
    expect(response.body[0]).to.include.all.keys('CodCliente', 'CodAtivo', 'Simbolo', 'QtdeAtivo', 'Valor');
    expect(response.body[0].CodAtivo).to.equal(1);
    expect(response.body[0].CodCliente).to.equal(1);
    expect(response.body[0].Valor).to.equal(30);
  });
});
