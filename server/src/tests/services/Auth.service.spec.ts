import { expect } from "chai";
import sinon from "sinon";

import MyConnection from "../../database/MyConnection";
import ContaModel from "../../models/Conta.model";
import AuthService from "../../services/Auth.service";
import HttpException from "../../utils/http.exception";
import jwt from "../../utils/jwt.token";

describe('Testa métodos da classe AuthService em Auth.service.ts', () => {
  describe('Método create', () => {
    const newContaMock = {
      nome: 'Conta Mock',
      cpf: '11111111111',
      email: 'conta@mock.com',
      senha: '123456'
    }
  
    const contaMock = {
      id: 1,
      nome: 'Conta Mock',
      cpf: '11111111111',
      email: 'conta@mock.com',
      senha: '123456',
      saldo: 0
    }
  
    const tokenMock = 'jwt-mock';
  
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
      it('Uma excessão deve ser lançada', async () => {

      });
      it ('A excessão deve possuir status 409 e a mensagem "Email já cadastrado"', async () => {
  
      })
    });
  });
  
  describe('Método login', () => {
    describe('Quando passa uma conta válida e existente', () => {
      it('Deve retornar um Jason Web Token', async () => {
  
      });
    });
    describe('Quando passa uma conta com email não cadastrado', () => {
      it('Uma excessão deve ser lançada', async () => {
  
      });
      it('A excessão deve possuir status 401 e a mensagem "Email ou senha inválidos"', async () => {
  
      });
    });
    describe('Quando passa uma conta com email válido e senha incompatível', () => {
      it('Uma excessão deve ser lançada', async () => {
  
      });
      it('A excessão deve possuir status 401 e a mensagem "Email ou senha inválidos"', async () => {
  
      });
    });
  })
})
