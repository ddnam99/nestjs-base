export const Environment = {
  SERVER_PORT: Number(process.env.SERVER_PORT),

  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: Number(process.env.REDIS_PORT),
  REDIS_PASS: process.env.REDIS_PASS,

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRE: Number(process.env.ACCESS_TOKEN_EXPIRE),
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRE: Number(process.env.REFRESH_TOKEN_EXPIRE),
};
