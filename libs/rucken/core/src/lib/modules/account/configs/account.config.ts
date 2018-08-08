import { IAccountConfig } from '../interfaces/account-config.interface';

export const defaultAccountConfig: IAccountConfig = {
  apiUri: '/api',
  updateUri: '/account/update'
};
export const ACCOUNT_CONFIG_TOKEN = 'AccountConfig';
