import { Provider } from '@angular/core';
import { AUTH_CONFIG_TOKEN, defaultAuthConfig } from './auth.config';
import { defaultJwtConfig, JWT_CONFIG_TOKEN } from './jwt.config';
import { defaultOauthConfig, OAUTH_CONFIG_TOKEN } from './oauth.config';

export const authProviders: Provider[] = [
  {
    provide: AUTH_CONFIG_TOKEN,
    useValue: defaultAuthConfig
  },
  {
    provide: JWT_CONFIG_TOKEN,
    useValue: defaultJwtConfig
  },
  {
    provide: OAUTH_CONFIG_TOKEN,
    useValue: defaultOauthConfig
  }
];
