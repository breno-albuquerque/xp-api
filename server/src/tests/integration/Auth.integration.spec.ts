/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable mocha/max-top-level-suites */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import sinon from 'sinon';
import server from '../../app';
import ContaModel from '../../models/Conta.model';
import { contaMock, newContaMock } from '../mocks/conta.mock.spec';

chai.use(chaiHttp);

type Methods = 'create' | 'getByEmail' | 'getById' | 'update';

const createModelStub = (resolveValue: any, method: Methods): sinon.SinonStub => (
  sinon.stub(ContaModel, method).resolves(resolveValue)
);

let response: any;
let stub1: sinon.SinonStub;
let stub2: sinon.SinonStub;

describe('Integração /auth/registrar - register', () => {
  afterEach(async () => {
    stub1.restore();
    stub2.restore();
  });

  beforeEach(async () => {
    stub1 = createModelStub(undefined, 'getByEmail');
    stub2 = createModelStub(1, 'create');

    response = await chai
      .request(server)
      .post('/auth/registrar')
      .send(newContaMock);
  });

  it('Deve retornar código status 201', () => {
    expect(response).to.have.status(201);
  });

  it('Deve retornar um Jason Web Token', () => {
    expect(response.body).to.have.key('token');
    expect(response.body.token).to.be.a('string');
  });
});

describe('Integração /auth/entrar - login', () => {
  afterEach(async () => {
    stub1.restore();
    stub2.restore();
  });

  beforeEach(async () => {
    stub1 = createModelStub({ ...contaMock, Senha: await bcrypt.hash('123456', 5) }, 'getByEmail');
    stub2 = createModelStub(1, 'create');

    response = await chai
      .request(server)
      .post('/auth/entrar')
      .send({ Email: 'conta@mock.com', Senha: '123456' });
  });

  it('Deve retornar código status 201', () => {
    expect(response).to.have.status(200);
  });

  it('Deve retornar um Jason Web Token', () => {
    expect(response.body).to.have.key('token');
    expect(response.body.token).to.be.a('string');
  });
});
