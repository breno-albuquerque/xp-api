import IConta from '../../interfaces/conta/IConta';
import INewConta from '../../interfaces/conta/INewConta';

export const newContaMock: INewConta = {
  Nome: 'Conta Mock',
  Cpf: '11111111111',
  Email: 'conta@mock.com',
  Senha: '123456',
};

export const contaMock: IConta = {
  ...newContaMock,
  Id: 1,
  Saldo: 0,
};
