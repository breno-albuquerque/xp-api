import { IAtivo, IFullAtivo } from '../../interfaces/IAtivo';

export const ativoMock: IAtivo = {
  Id: 1,
  Simbolo: 'SYMBOL',
  QtdeAtivo: 100,
};

export const fullAtivoMock: IFullAtivo = {
  ...ativoMock,
  CodCliente: 1,
  Valor: 30,
};

export const clientsAtivoMock = {
  CodAtivo: 1,
  CodCliente: 1,
  QtdeAtivo: 10,
  Simbolo: 'SYMBOL',
};
