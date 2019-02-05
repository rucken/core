import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ILangConfig } from './interfaces/lang-config.interface';
import { LangService } from './services/lang.service';
import { LANG_CONFIG_TOKEN, DEFAULT_LANG_CONFIG } from './configs/lang.config';
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
            appLang: options.appLang ? options.appLang : DEFAULT_LANG_CONFIG.appLang,
            defaultLang: options.defaultLang ? options.defaultLang : DEFAULT_LANG_CONFIG.defaultLang,
            storageKeyName: options.storageKeyName ? options.storageKeyName : DEFAULT_LANG_CONFIG.storageKeyName,
            languages: options.languages ? options.languages : DEFAULT_LANG_CONFIG.languages
          }
        },
        LangService
      ]
    };
  }
}
