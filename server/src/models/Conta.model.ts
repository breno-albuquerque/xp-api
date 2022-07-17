import MyConnection from "../database/MyConnection";


class ContaModel {

  public static async create(values: any) {
    const result = await MyConnection.run('INSERT INTO xp-db (email, password) VALUES (?, ?)' ,[...values]);
    return result;
  }

}

export default ContaModel;
