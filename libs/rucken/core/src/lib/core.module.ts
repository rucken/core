import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RuI18n } from '../i18n/ru.i18n';
import { ENTITIES_PROVIDERS } from './configs/providers';
import { LANGUAGES_ITEM_CONFIG_TOKEN } from './modules/lang/configs/languages-item.config';
import { ErrorsExtractor } from './utils/errors-extractor';
import { PermissionsGuard } from './utils/permissions-guard.service';
import { translate } from './utils/translate';

@NgModule({
  imports: [CommonModule],
  providers: [
    CookieService,
    ErrorsExtractor,
    PermissionsGuard,
    {
      provide: LANGUAGES_ITEM_CONFIG_TOKEN,
      useValue: {
        title: translate('Russian'),
        code: 'ru',
        translations: [RuI18n]
      },
      multi: true
    },
    {
      provide: LANGUAGES_ITEM_CONFIG_TOKEN,
      useValue: {
        title: translate('English'),
        code: 'en',
        translations: []
      },
      multi: true
    },
    ...ENTITIES_PROVIDERS
  ]
})
export class RuckenCoreModule {}
