import INewConta from './INewConta';

interface IConta extends INewConta {
  Id: number,
  Saldo: number
}

export default IConta;
