import { IAccountConfig } from '../interfaces/account-config.interface';

export const defaultAccountConfig: IAccountConfig = {
  apiUrl: '/api',
  updateUrl: '/account/update'
};
export const ACCOUNT_CONFIG_TOKEN = 'AccountConfig';
