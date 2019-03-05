import { IAuthModalOauthProvider, ILanguagesItem } from '@rucken/core';

export interface ICoreConfig {
  app: {
    id: string;
    title: string;
    description: string;
    languages: ILanguagesItem[];
  };
  authModal: {
    signInInfoMessage: string | { text: string; data: { [key: string]: string } };
    signUpInfoMessage: string | { text: string; data: { [key: string]: string } };
  };
  oauth: IAuthModalOauthProvider[];
}
