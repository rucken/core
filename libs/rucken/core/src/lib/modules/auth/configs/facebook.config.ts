import { IFacebookConfig } from '../interfaces/facebook-config.interface';

export const defaultFacebookConfig: IFacebookConfig = {
  apiUri: '/api',
  signinUri: '/auth/facebook/signin',
  redirectUri: '/auth/facebook/uri'
};
export const FACEBOOK_CONFIG_TOKEN = 'FacebookConfig';
