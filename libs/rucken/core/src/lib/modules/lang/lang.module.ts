import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule
} from '@ngx-translate/core';
import { ILangConfig } from './interfaces/lang-config.interface';
import { LangService } from './services/lang.service';
import { LANG_CONFIG_TOKEN, defaultLangConfig } from './configs/lang.config';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
    })
  ],
  providers: [LangService]
})
export class LangModule {
  static forRoot(options?: ILangConfig): ModuleWithProviders {
    return {
      ngModule: LangModule,
      providers: [
        {
          provide: LANG_CONFIG_TOKEN,
          useValue: {
            appLang: options.appLang
              ? options.appLang
              : defaultLangConfig.appLang,
            defaultLang: options.defaultLang
              ? options.defaultLang
              : defaultLangConfig.defaultLang,
            storageKeyName: options.storageKeyName
              ? options.storageKeyName
              : defaultLangConfig.storageKeyName,
            languages: options.languages
              ? options.languages
              : defaultLangConfig.languages
          }
        },
        LangService
      ]
    };
  }
}
