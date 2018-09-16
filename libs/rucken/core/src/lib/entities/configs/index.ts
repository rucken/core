import { Provider } from '@angular/core';
import { CONTENT_TYPES_CONFIG_TOKEN, defaultContentTypesConfig } from './content-types.config';
import { defaultGroupsConfig, GROUP_CONFIG_TOKEN } from './groups.config';
import { defaultPermissionsConfig, PERMISSIONS_CONFIG_TOKEN } from './permissions.config';
import { defaultUsersConfig, USERS_CONFIG_TOKEN } from './users.config';


export const entitiesProviders: Provider[] = [
  {
    provide: CONTENT_TYPES_CONFIG_TOKEN,
    useValue: defaultContentTypesConfig
  },
  {
    provide: GROUP_CONFIG_TOKEN,
    useValue: defaultGroupsConfig
  },
  {
    provide: PERMISSIONS_CONFIG_TOKEN,
    useValue: defaultPermissionsConfig
  },
  {
    provide: USERS_CONFIG_TOKEN,
    useValue: defaultUsersConfig
  }
];
