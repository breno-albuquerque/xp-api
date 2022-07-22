export interface IContaQueries {
  create: string;
  getById: string;
  getByEmail: string;
  update: string;
}

export interface ITransactionQueries {
  create: string;
}

export interface IAtivoQueries {
  getById: string;
  update: string;
  getAll: string;
  getByClient: string;
}

export interface IInvestimentoQueries {
  getOne: string;
  create: string;
  update: string;
  delete: string;
}

export interface IQueries extends 
IContaQueries, ITransactionQueries, 
IAtivoQueries, IInvestimentoQueries { }
