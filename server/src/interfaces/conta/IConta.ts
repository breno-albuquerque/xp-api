import INewConta from './INewConta';

interface IConta extends INewConta {
  id: number,
  saldo: number
}

export default IConta;
