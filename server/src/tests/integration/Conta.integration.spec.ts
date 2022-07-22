/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable mocha/max-top-level-suites */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon, { SinonStub } from 'sinon';
import server from '../../app';
import ContaModel from '../../models/Conta.model';
import { contaMock } from '../mocks/conta.mock.spec';
import DepositoModel from '../../models/Deposito.model';
import SaqueModel from '../../models/Saque.model';
import jwt from '../../utils/jwt.token';

chai.use(chaiHttp);

type ContaMethods = 'create' | 'getByEmail' | 'getById' | 'update';
type TransactionMethods = 'create';

const createContaModelStub = (resolveValue: any, method: ContaMethods): sinon.SinonStub => (
  sinon.stub(ContaModel, method).resolves(resolveValue)
);

const createDepositModelStub = (resolveValue: any, method: TransactionMethods): sinon.SinonStub => (
  sinon.stub(DepositoModel, method).resolves(resolveValue)
);

const createSaqueModelStub = (resolveValue: any, method: TransactionMethods): sinon.SinonStub => (
  sinon.stub(SaqueModel, method).resolves(resolveValue)
);

const token = jwt.generateToken({ Id: 1, Nome: 'Conta Mock' });

let response: any;
let stub1: sinon.SinonStub;
let stub2: sinon.SinonStub;
let stub3: sinon.SinonStub;

const restoreStubs = (arr: SinonStub[]) => arr
.forEach((stub: SinonStub) => stub && stub.restore());

describe('Integração /conta/:CodCliente - getById', () => {
  afterEach(async () => {
    const stubs: SinonStub[] = [stub1, stub2, stub3];
    restoreStubs(stubs);
  });

  beforeEach(async () => {
    stub1 = createContaModelStub(contaMock, 'getById');

    response = await chai
      .request(server)
      .get('/conta/1')
      .set('Authorization', `Baerer ${token}`);
  });

  it('Deve retornar código status 200', () => {
    expect(response).to.have.status(200);
  });

  it('Deve retornar um objeto com os dados corretos da conta', () => {
    expect(response.body).to.include.all.keys('Id', 'Nome', 'Saldo');
  });
});

describe('Integração /conta/depositar - deposit', () => {
  afterEach(async () => {
    const stubs: SinonStub[] = [stub1, stub2, stub3];
    restoreStubs(stubs);
  });

  beforeEach(async () => {
    stub1 = createContaModelStub(contaMock, 'getById');
    stub2 = createDepositModelStub({ insertId: 1 }, 'create');
    stub3 = createContaModelStub({ affectedRows: 1 }, 'update');
  });

  it('Enviando o body e o parâmetro correto, deve retornar código status 201', async () => {
    response = await chai
    .request(server)
    .post('/conta/depositar')
    .set('Authorization', `Baerer ${token}`)
    .send({ CodCliente: 1, Valor: 100 });

    expect(response).to.have.status(201);
  });

  it('Tentando depositar em outra conta, deve retornar código status 401', async () => {
    response = await chai
    .request(server)
    .post('/conta/depositar')
    .set('Authorization', `Baerer ${token}`)
    .send({ CodCliente: 2, Valor: 100 });

    expect(response).to.have.status(401);
  });
});

describe('Integração /conta/sacar - withdrawal', () => {
  afterEach(async () => {
    const stubs: SinonStub[] = [stub1, stub2, stub3];
    restoreStubs(stubs);
  });

  beforeEach(async () => {
    stub1 = createContaModelStub({ ...contaMock, Saldo: 50 }, 'getById');
    stub2 = createSaqueModelStub({ insertId: 1 }, 'create');
    stub3 = createContaModelStub({ affectedRows: 1 }, 'update');
  });

  it('Enviando o body e o parâmetro correto, deve retornar código status 201', async () => {
    response = await chai
    .request(server)
    .post('/conta/sacar')
    .set('Authorization', `Baerer ${token}`)
    .send({ CodCliente: 1, Valor: 30 });

    expect(response).to.have.status(201);
  });

  it('Tentando sacar de outra conta, deve retornar código status 401', async () => {
    response = await chai
    .request(server)
    .post('/conta/sacar')
    .set('Authorization', `Baerer ${token}`)
    .send({ CodCliente: 2, Valor: 30 });

    expect(response).to.have.status(401);
  });
});
