import { IGooglePlusConfig } from '../interfaces/google-plus-config.interface';

export const defaultGooglePlusConfig: IGooglePlusConfig = {
  apiUri: '/api',
  signInUri: '/auth/google/signin',
  redirectUri: '/auth/google/uri'
};
export const GOOGLE_PLUS_CONFIG_TOKEN = 'FacebookConfig';
