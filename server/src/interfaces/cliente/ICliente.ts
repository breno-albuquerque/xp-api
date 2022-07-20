import INewCliente from './INewCliente';

interface ICliente extends INewCliente {
  Id: number,
  CodConta: number
}

export default ICliente;