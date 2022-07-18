import chai, { expect } from "chai";
import sinon from "sinon";
import ContaModel from "../../models/Conta.model";
import AuthService from "../../services/Auth.service";
import HttpException from "../../utils/http.exception";
import jwt from "../../utils/jwt.token";
import bcrypt from 'bcrypt';
import { newContaMock, contaMock } from "../mocks/conta.mock.spec";
import chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const tokenMock = 'jwt-mock';

describe('Testa métodos da classe AuthService em Auth.service.ts', () => {
  describe('Método create', () => {
    describe('Quando passa uma conta válida para cadastro', () => {
      let stub1: sinon.SinonStub;
      let stub2: sinon.SinonStub;
      let stub3: sinon.SinonStub;
  
      beforeEach(async () => {
        stub1 = sinon.stub(ContaModel, 'getByEmail').resolves(undefined);
        stub2 = sinon.stub(ContaModel, 'create').resolves(1);
        stub3 = sinon.stub(jwt, 'generateToken').returns(tokenMock);
      });
    
      afterEach(async () => {
        stub1.restore();
        stub2.restore();
        stub3.restore();
      });
  
      it('Deve retornar um Jason Web Token', async () => {
        const result = await AuthService.create(newContaMock);
  
        expect(result).to.be.a('string');
        expect(result).to.equal(tokenMock);
      });
    });

    describe('Quando passa uma conta com email já cadastrado', () => {
      let stub: sinon.SinonStub;

      beforeEach(async () => {
        stub = sinon.stub(ContaModel, 'getByEmail').resolves(contaMock);
      });
    
      afterEach(async () => {
        stub.restore();
      });

      it('Uma excessão deve ser lançada com a mensagem "Email já cadastrado"', async () => {
        await expect(AuthService.create(newContaMock))
          .to.be.rejectedWith(HttpException, 'Email já cadastrado');
      });
    });
  });
  
  describe('Método login', () => { 
    describe('Quando passa uma conta válida e existente', () => {
      let stub1: sinon.SinonStub;
      let stub2: sinon.SinonStub;
      let stub3: sinon.SinonStub;
  
      beforeEach(async () => {
        stub1 = sinon.stub(ContaModel, 'getByEmail').resolves(contaMock);
        stub2 = sinon.stub(jwt, 'generateToken').returns(tokenMock);
        stub3 = sinon.stub(bcrypt, 'compare').resolves(true);
      });
    
      afterEach(async () => {
        stub1.restore();
        stub2.restore();
        stub3.restore();
      });

      it('Deve retornar um Jason Web Token', async () => {
        const result = await AuthService.login(newContaMock);

        expect(result).to.be.a('string');
        expect(result).to.equal(tokenMock);
      });
    });

    describe('Quando passa uma conta com email não cadastrado', () => {
      let stub: sinon.SinonStub;
  
      beforeEach(async () => {
        stub = sinon.stub(ContaModel, 'getByEmail').resolves(undefined);
      });
    
      afterEach(async () => {
        stub.restore();
      });

      it('Uma excessão deve ser lançada com a mensagem "Email ou senha inválidos"', async () => {
        await expect(AuthService.login(newContaMock))
          .to.be.rejectedWith(HttpException, 'Email ou senha inválidos');
      });
    });

    describe('Quando passa uma conta com email válido e senha incompatível ', () => {
      let stub1: sinon.SinonStub;
      let stub2: sinon.SinonStub;
  
      beforeEach(async () => {
        stub1 = sinon.stub(ContaModel, 'getByEmail').resolves(contaMock);
        stub2 = sinon.stub(bcrypt, 'compare').resolves(false);
      });
    
      afterEach(async () => {
        stub1.restore();
        stub2.restore();
      });

      it('Uma excessão deve ser lançada com a mensagem "Email ou senha inválidos"', async () => {
        await expect(AuthService.login(newContaMock))
          .to.be.rejectedWith(HttpException, 'Email ou senha inválidos');
      });
    });
  });
});
