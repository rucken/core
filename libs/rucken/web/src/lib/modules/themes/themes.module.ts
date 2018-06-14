import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, APP_INITIALIZER } from '@angular/core';
import { ThemesService, themesServiceInitializeApp } from './themes.service';
import { ThemesStorage } from './themes.storage';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ThemesService,
    ThemesStorage
  ]
})
export class ThemesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ThemesModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: themesServiceInitializeApp,
          multi: true,
          deps: [ThemesService]
        }
      ]
    };
  }
}
