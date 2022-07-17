import MyConnection from "../database/MyConnection";


class ContaModel {

  public static async create(values: any) {
    const { email, password } = values
    const result = await MyConnection.run('INSERT INTO Conta (email, password) VALUES (?, ?)' ,[email, password]);
    return result;
  }

}

export default ContaModel;
