import INewAtivo from "./INewAtivo";

interface IAtivo extends INewAtivo {
  id: number,
  valor?: number
}

export default IAtivo;
