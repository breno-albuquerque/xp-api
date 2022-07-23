export interface IAtivo {
  Id: number,
  Simbolo: string,
  QtdeAtivo: number,
}

export interface IFullAtivo extends IAtivo {
  CodCliente: number,
  Valor?: number,
}
