import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, APP_INITIALIZER } from '@angular/core';
import {
  ThemesService,
  themesServiceInitializeApp
} from './services/themes.service';
import { IThemesConfig } from './interfaces/themes-config.interface';
import {
  THEMES_CONFIG_TOKEN,
  defaultThemesConfig
} from './configs/themes.config';
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
            mockedItems: options.mockedItems
              ? options.mockedItems
              : defaultThemesConfig.mockedItems,
            storageKeyName: options.storageKeyName
              ? options.storageKeyName
              : defaultThemesConfig.storageKeyName
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
