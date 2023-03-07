interface ICreateRefreshTokenDTO {
    userId: string;
    expirationDate: Date;
    refreshToken: string;
  }

export default ICreateRefreshTokenDTO;
