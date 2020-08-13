import { IAuthOauthProvider } from './auth-oauth-provider.interface';

export interface IOauthConfig {
  apiUrl?: string;
  signInUrl?: string;
  redirectUrl?: string;
  providers?: IAuthOauthProvider[];
}
