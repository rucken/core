import { IAuthConfig } from '../interfaces/auth-config.interface';

export const defaultAuthConfig: IAuthConfig = {
  apiUri: '/api',
  loginUri: '/auth/login',
  registerUri: '/auth/register',
  infoUri: '/auth/info'
};
export const AUTH_CONFIG_TOKEN = 'AuthConfig';
