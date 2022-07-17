import MyConnection from "../database/MyConnection";
import INewConta from "../interfaces/conta/INewConta";


class ContaModel {

  public static async create(query: string, values: INewConta) {
    const { email, password } = values;
    const result = await MyConnection.run(query, [email, password]);
    return result;
  }

}

export default ContaModel;
