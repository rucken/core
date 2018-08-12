import { IAuthConfig } from '../interfaces/auth-config.interface';

export const defaultAuthConfig: IAuthConfig = {
  apiUri: '/api',
  signInUri: '/auth/signin',
  signUpUri: '/auth/signup',
  infoUri: '/auth/info'
};
export const AUTH_CONFIG_TOKEN = 'AuthConfig';
