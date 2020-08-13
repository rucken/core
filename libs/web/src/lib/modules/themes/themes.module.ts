import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, APP_INITIALIZER } from '@angular/core';
import { ThemesService, themesServiceInitializeApp } from './services/themes.service';
import { IThemesConfig } from './interfaces/themes-config.interface';
import { THEMES_CONFIG_TOKEN, DEFAULT_THEMES_CONFIG } from './configs/themes.config';
@NgModule({
  imports: [CommonModule],
  providers: [ThemesService]
})
export class ThemesModule {
  static forRoot(options?: IThemesConfig): ModuleWithProviders {
    return {
      ngModule: ThemesModule,
      providers: [
        {
          provide: THEMES_CONFIG_TOKEN,
          useValue: {
            mockedItems: options && options.mockedItems ? options.mockedItems : DEFAULT_THEMES_CONFIG.mockedItems,
            storageKeyName:
              options && options.storageKeyName ? options.storageKeyName : DEFAULT_THEMES_CONFIG.storageKeyName
          }
        },
        {
          provide: APP_INITIALIZER,
          useFactory: themesServiceInitializeApp,
          multi: true,
          deps: [ThemesService]
        },
        ThemesService
      ]
    };
  }
}
