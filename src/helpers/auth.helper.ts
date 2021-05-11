import config from '$config';
import { sign } from 'jsonwebtoken';

export const generateToken = (data: any) => {
  const accessToken = sign(data, config.ENV.ACCESS_TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: config.ENV.ACCESS_TOKEN_EXPIRE,
  }) as string;
  const refreshToken = sign(data, config.ENV.REFRESH_TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: config.ENV.REFRESH_TOKEN_EXPIRE,
  }) as string;

  return { accessToken, refreshToken };
};
