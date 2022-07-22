/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable mocha/max-top-level-suites */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon, { SinonStub } from 'sinon';
import InvestimentoModel from '../../models/Investimento.model';
import AtivoService from '../../services/Ativo.service';
import investimentoMock from '../mocks/investimento.mock.spec';
import server from '../../app';
import jwt from '../../utils/jwt.token';
import { fullAtivoMock } from '../mocks/ativo.mock.spec';
import ContaService from '../../services/Conta.service';

chai.use(chaiHttp);

type InvestMethods = 'create' | 'update' | 'getOne' | 'delete';
type AtivoMethods = 'getAll' | 'getById' | 'getByClient' | 'updateWhenBought' | 'updateWhenSold' | 'getValue';

const createInvestModelStub = (resolveValue: any, method: InvestMethods): sinon.SinonStub => (
  sinon.stub(InvestimentoModel, method).resolves(resolveValue)
);

const createAtivoServiceStub = (resolveValue: any, method: AtivoMethods): sinon.SinonStub => (
  sinon.stub(AtivoService, method).resolves(resolveValue)
);

let response: any;
let stub1: sinon.SinonStub;
let stub2: sinon.SinonStub;
let stub3: sinon.SinonStub;
let stub4: sinon.SinonStub;
let stub5: sinon.SinonStub;

const restoreStubs = (arr: SinonStub[]) => arr
  .forEach((stub: SinonStub) => stub && stub.restore());

const token = jwt.generateToken({ Id: 1, Nome: 'Conta Mock' });

describe('Integração /investimentos/comprar - puchase', () => {
  afterEach(async () => {
    const stubs: SinonStub[] = [stub1, stub2, stub3, stub4, stub5];
    restoreStubs(stubs);
  });

  beforeEach(async () => {
    stub1 = createInvestModelStub(undefined, 'getOne');
    stub2 = createInvestModelStub({ insertId: 1 }, 'create');
    stub3 = createAtivoServiceStub(fullAtivoMock, 'getById');
    stub4 = createAtivoServiceStub(undefined, 'updateWhenBought');
    stub5 = sinon.stub(ContaService, 'withdrawal').resolves(undefined);
  });
  
  it('Ao ser passado os dados corretos, deve retornar código status 200', async () => {
    response = await chai
      .request(server)
      .post('/investimentos/comprar')
      .set('Authorization', `Baerer ${token}`)
      .send({ CodCliente: 1, CodAtivo: 1, QtdeAtivo: 10 });

    expect(response).to.have.status(201);
  });

  it('Ao tentar investir comprar o código de outro cliente, deve retornar o status 401', async () => {
    response = await chai
      .request(server)
      .post('/investimentos/comprar')
      .set('Authorization', `Baerer ${token}`)
      .send({ CodCliente: 2, CodAtivo: 1, QtdeAtivo: 10 });

    expect(response).to.have.status(401);
  });
});

describe('Integração /investimentos/vender - withdrawal', () => {
  afterEach(async () => {
    const stubs: SinonStub[] = [stub1, stub2, stub3, stub4, stub5];
    restoreStubs(stubs);
  });

  beforeEach(async () => {
    stub1 = createInvestModelStub(investimentoMock, 'getOne');
    stub2 = createInvestModelStub({ affectedRows: 1 }, 'update');
    stub3 = createAtivoServiceStub(fullAtivoMock, 'getById');
    stub4 = createAtivoServiceStub(undefined, 'updateWhenSold');
    stub5 = sinon.stub(ContaService, 'deposit').resolves(undefined);
  });
  
  it('Ao ser passado os dados corretos, deve retornar código status 200', async () => {
    response = await chai
      .request(server)
      .post('/investimentos/vender')
      .set('Authorization', `Baerer ${token}`)
      .send({ CodCliente: 1, CodAtivo: 1, QtdeAtivo: 5 });

    expect(response).to.have.status(201);
  });

  it('Ao tentar vender com o código de outro cliente, deve retornar o status 401', async () => {
    response = await chai
      .request(server)
      .post('/investimentos/vender')
      .set('Authorization', `Baerer ${token}`)
      .send({ CodCliente: 2, CodAtivo: 1, QtdeAtivo: 10 });

    expect(response).to.have.status(401);
  });
});
