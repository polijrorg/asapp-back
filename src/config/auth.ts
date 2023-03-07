export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '1d',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'default',
    refreshTokenExpiresIn: '30d',
    refreshTokenExpiresInDaysAmount: 30,
  },
};
