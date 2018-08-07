import {
    defaultFacebookConfig,
    FACEBOOK_CONFIG_TOKEN
} from './facebook.config';
import {
    defaultGooglePlusConfig,
    GOOGLE_PLUS_CONFIG_TOKEN
} from './google-plus.config';
import { defaultJwtConfig, JWT_CONFIG_TOKEN } from './jwt.config';
import { AUTH_CONFIG_TOKEN, defaultAuthConfig } from './auth.config';

export const authConfigs = [
    {
        provide: AUTH_CONFIG_TOKEN,
        useValue: defaultAuthConfig
    },
    {
        provide: JWT_CONFIG_TOKEN,
        useValue: defaultJwtConfig
    },
    {
        provide: FACEBOOK_CONFIG_TOKEN,
        useValue: defaultFacebookConfig
    },
    {
        provide: GOOGLE_PLUS_CONFIG_TOKEN,
        useValue: defaultGooglePlusConfig
    }
];
