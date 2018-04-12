import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ThemesService } from './themes.service';
import { ThemesStorage } from './themes.storage';
import { CookiesModule } from '@rucken/core';

@NgModule({
  imports: [
    CommonModule,
    CookiesModule.forRoot()
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
        ThemesService,
        ThemesStorage
      ]
    };
  }
}
