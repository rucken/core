import { IOauthConfig } from '../interfaces/oauth-config.interface';

export const DEFAULT_OAUTH_CONFIG: IOauthConfig = {
  apiUrl: '/api',
  signInUrl: '/auth/{provider}/signin',
  redirectUrl: '/auth/{provider}/uri',
  providers: []
};
export const OAUTH_CONFIG_TOKEN = 'OauthConfig';
