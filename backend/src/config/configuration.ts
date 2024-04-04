export default () => ({
  nodeEnv: process.env.NODE_ENV,
  postgress: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  popplerBinariesPath: process.env.POPPLER_BIN_PATH,
  openAiApiKey: process.env.OPENAI_API_KEY,
});
