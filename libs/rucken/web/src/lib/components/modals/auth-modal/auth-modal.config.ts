import { IAuthModalConfig } from './interfaces/auth-modal-config.interface';

export const defaultAuthModalConfig: IAuthModalConfig = {
  oauth: {
    providers: []
  }
};
export const AUTH_MODAL_CONFIG_TOKEN = 'AuthModalConfig';
