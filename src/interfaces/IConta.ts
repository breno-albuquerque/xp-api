export interface INewConta {
  Nome: string,
  Cpf: string,
  Email: string,
  Senha: string
}

export interface IConta extends INewConta {
  Id: number,
  Saldo: number
}
