interface IConnection {
  queries: any,
  run(query: string, valus?: any): any;
}

export default IConnection