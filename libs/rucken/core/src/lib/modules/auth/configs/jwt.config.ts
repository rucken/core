import { IJwtConfig } from '../interfaces/jwt-config.interface';

export const defaultJwtConfig: IJwtConfig = {
  withoutTokenUrls: ['auth/'],
  headerName: 'Authorization',
  headerPrefix: 'JWT',
  tokenName: 'token',
  storageKeyName: 'token'
};
export const JWT_CONFIG_TOKEN = 'JwtConfig';
