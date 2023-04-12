const linkerConfig = {
  authUrl: process.env.LINKER_AUTH_URL as string,
  apiUsername: process.env.LINKER_USERNAME as string,
  apiSecretKey: process.env.LINKER_PASSWORD as string,
  apiUrl: process.env.LINKER_API_URL as string
};

export default linkerConfig;
