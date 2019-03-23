import { Provider } from '@angular/core';
import { CONTENT_TYPES_CONFIG_TOKEN, DEFAULT_CONTENT_TYPES_CONFIG } from './content-types.config';
import { DEFAULT_GROUPS_CONFIG, GROUPS_CONFIG_TOKEN } from './groups.config';
import { DEFAULT_PERMISSIONS_CONFIG, PERMISSIONS_CONFIG_TOKEN } from './permissions.config';
import { DEFAULT_USERS_CONFIG, USERS_CONFIG_TOKEN } from './users.config';

export const ENTITIES_PROVIDERS: Provider[] = [
  {
    provide: CONTENT_TYPES_CONFIG_TOKEN,
    useValue: DEFAULT_CONTENT_TYPES_CONFIG
  },
  {
    provide: GROUPS_CONFIG_TOKEN,
    useValue: DEFAULT_GROUPS_CONFIG
  },
  {
    provide: PERMISSIONS_CONFIG_TOKEN,
    useValue: DEFAULT_PERMISSIONS_CONFIG
  },
  {
    provide: USERS_CONFIG_TOKEN,
    useValue: DEFAULT_USERS_CONFIG
  }
];
