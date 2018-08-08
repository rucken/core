import { IJwtConfig } from '../interfaces/jwt-config.interface';

export const defaultJwtConfig: IJwtConfig = {
  withoutTokenUrls: ['auth/signin', 'auth/signup', 'auth/info'],
  headerName: 'Authorization',
  headerPrefix: 'JWT',
  tokenName: 'token',
  storageKeyName: 'token'
};
export const JWT_CONFIG_TOKEN = 'JwtConfig';
