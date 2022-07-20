import IConta from '../../interfaces/conta/IConta';
import INewConta from '../../interfaces/conta/INewConta';

export const newContaMock: INewConta = {
  nome: 'Conta Mock',
  cpf: '11111111111',
  email: 'conta@mock.com',
  senha: '123456',
};

export const contaMock: IConta = {
  id: 1,
  nome: 'Conta Mock',
  cpf: '11111111111',
  email: 'conta@mock.com',
  senha: '123456',
  saldo: 0,
};