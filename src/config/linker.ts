const linkerConfig = {
  apiUrl: process.env.LINKER_URL as string,
  apiUsername: process.env.LINKER_USERNAME as string,
  apiSecretKey: process.env.LINKER_PASSWORD as string
};

export default linkerConfig;
