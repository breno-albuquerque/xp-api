interface IConnection {
  queries: any,
  run(query: string, values?: any): any;
}

export default IConnection;
