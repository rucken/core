import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LANGUAGES_ITEM_CONFIG_TOKEN, translate } from '@rucken/core';
import { BsLocaleService } from 'ngx-bootstrap';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { enGbLocale, ruLocale } from 'ngx-bootstrap/locale';
import { RuI18n } from '../i18n/ru.i18n';
import { NavbarModule } from './components/navbar/navbar.module';
import { WebAuthModalModule } from './modules/auth-modal/auth-modal.module';
import { WebModalsModule } from './modules/modals/modals.module';

defineLocale('ru', ruLocale);
defineLocale('en', enGbLocale);

@NgModule({
  imports: [CommonModule, WebAuthModalModule, WebModalsModule, NavbarModule],
  exports: [WebAuthModalModule, WebModalsModule, NavbarModule],
  providers: [
    BsLocaleService,
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
    }
  ]
})
export class RuckenWebModule {}
