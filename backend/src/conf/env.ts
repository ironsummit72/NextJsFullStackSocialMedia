import "dotenv/config";

const envs = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  DB_NAME: process.env.DB_NAME,
  ORIGIN: process.env.ORIGIN,
  JWT_SECRET: process.env.JWT_SECRET,
};
export default envs;
