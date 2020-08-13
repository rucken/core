import { IAuthModalOauthProvider } from './auth-modal-oauth-provider.interface';

export interface IAuthModalConfig {
  oauth?: {
    providers?: IAuthModalOauthProvider[];
  };
}
