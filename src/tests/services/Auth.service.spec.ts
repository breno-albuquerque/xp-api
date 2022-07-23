/* eslint-disable @typescript-eslint/no-explicit-any */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcrypt';
import chaiAsPromised = require('chai-as-promised');
import ContaModel from '../../models/Conta.model';
import AuthService from '../../services/Auth.service';
import HttpException from '../../utils/http.exception';
import jwt from '../../utils/jwt.token';
import { newContaMock, contaMock } from '../mocks/conta.mock.spec';

chai.use(chaiAsPromised);

const tokenMock = 'jwt-mock';

type ContaModelMethods = 'getById' | 'create' | 'getByEmail' | 'update';

const createModelStub = (resolveValue: any, method: ContaModelMethods): sinon.SinonStub => (
  sinon.stub(ContaModel, method).resolves(resolveValue)
);

describe('Testa métodos da classe AuthService', () => {
  let stub1: sinon.SinonStub;
  let stub2: sinon.SinonStub;
  let stub3: sinon.SinonStub;
  
  afterEach(() => {
    const stubs = [stub1, stub2, stub3];
    stubs.forEach((stub) => stub && stub.restore());
  });
  
  context('Método create', () => {
    it('Ao ser passada uma conta válida, deve retornar o Id inserido', async () => {
      stub1 = createModelStub(undefined, 'getByEmail');
      stub2 = createModelStub(1, 'create');

      const result = await AuthService
        .register(newContaMock);

      expect(result).to.be.a('number');
      expect(result).to.equal(1);
    });

    it('Ao ser passado uma conta ja cadastrada, uma excessão deve ser lançada: "Email já cadastrado"', async () => {
      stub1 = createModelStub(contaMock, 'getByEmail');

      await expect(AuthService.register(newContaMock))
        .to.be.rejectedWith(HttpException, 'Email já cadastrado');
    });
  });
  
  context('Método login', () => {
    it('Ao ser passada uma conta cadastrada e válida, deve retornar um JWT', async () => {
      stub1 = createModelStub(contaMock, 'getByEmail');
      stub2 = sinon.stub(jwt, 'generateToken').returns(tokenMock);
      stub3 = sinon.stub(bcrypt, 'compare').resolves(true);

      const result = await AuthService
        .login(newContaMock);

      expect(result).to.be.a('string');
      expect(result).to.equal(tokenMock);
    });

    it('Ao ser passada uma conta com email não cadastrado, uma excessão deve ser lançada: "Email ou senha inválidos"', async () => {
      stub1 = createModelStub(undefined, 'getByEmail');

      await expect(AuthService.login(newContaMock))
        .to.be.rejectedWith(HttpException, 'Email ou senha inválidos');
    });
  
    it('Ao ser passada uma conta com senha incompatível, uma excessão deve ser lançada: "Email ou senha inválidos"', async () => {
      stub1 = createModelStub(contaMock, 'getByEmail');
      stub2 = sinon.stub(bcrypt, 'compare').resolves(false);

      await expect(AuthService.login(newContaMock))
        .to.be.rejectedWith(HttpException, 'Email ou senha inválidos');
    });
  });
});
