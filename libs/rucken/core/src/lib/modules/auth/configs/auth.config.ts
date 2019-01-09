import { IAuthConfig } from '../interfaces/auth-config.interface';

export const defaultAuthConfig: IAuthConfig = {
  apiUrl: '/api',
  signInUrl: '/auth/signin',
  signUpUrl: '/auth/signup',
  infoUrl: '/auth/info'
};
export const AUTH_CONFIG_TOKEN = 'AuthConfig';
