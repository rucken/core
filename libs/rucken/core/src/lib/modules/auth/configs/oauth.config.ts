import { IOauthConfig } from '../interfaces/oauth-config.interface';

export const defaultOauthConfig: IOauthConfig = {
  apiUri: '/api',
  signInUri: '/auth/{provider}/signin',
  redirectUri: '/auth/{provider}/uri',
  providers: []
};
export const OAUTH_CONFIG_TOKEN = 'OauthConfig';
