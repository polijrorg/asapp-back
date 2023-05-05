export default interface ILinkerError {
  response: {
    status: number;
    data: {
      message: string;
    };
  };
}
