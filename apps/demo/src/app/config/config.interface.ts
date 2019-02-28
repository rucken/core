import { IAuthModalOauthProvider, ILanguagesItem } from '@rucken/core';

export interface ICoreConfig {
  app: {
    id: string;
    title: string;
    description: string;
    languages: ILanguagesItem[];
  };
  authModal: {
    signInInfoMessage: string;
    signUpInfoMessage: string;
  };
  oauth: IAuthModalOauthProvider[];
}
