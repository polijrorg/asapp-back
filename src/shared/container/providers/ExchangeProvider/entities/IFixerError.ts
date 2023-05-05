export default interface ILinkerError {
  response: {
    success: boolean;
    error: {
      code: number;
      info: string;
    };
  };
}
