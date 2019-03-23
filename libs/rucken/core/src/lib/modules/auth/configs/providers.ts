import { Provider } from '@angular/core';
import { AUTH_CONFIG_TOKEN, DEFAULT_AUTH_CONFIG } from './auth.config';
import { DEFAULT_JWT_CONFIG, JWT_CONFIG_TOKEN } from './jwt.config';
import { DEFAULT_OAUTH_CONFIG, OAUTH_CONFIG_TOKEN } from './oauth.config';

export const AUTH_PROVIDERS: Provider[] = [
  {
    provide: AUTH_CONFIG_TOKEN,
    useValue: DEFAULT_AUTH_CONFIG
  },
  {
    provide: JWT_CONFIG_TOKEN,
    useValue: DEFAULT_JWT_CONFIG
  },
  {
    provide: OAUTH_CONFIG_TOKEN,
    useValue: DEFAULT_OAUTH_CONFIG
  }
];
