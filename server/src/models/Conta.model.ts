import MyConnection from "../database/MyConnection";


class ContaModel {

  public async create(query: string, values: any) {
    const { email, senha } = values;
    const result = await MyConnection.run(query, [...values]);
  }
  
}

export default ContaModel;
