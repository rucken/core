import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@rucken/web';
import { NgxRepositoryModule } from 'ngx-repository';

@NgModule({
  imports: [
    CommonModule,
    NgxRepositoryModule.forRoot(),
    PipesModule.forRoot(),
    TranslateModule.forChild(),
  ],
  exports: [
    CommonModule,
    TranslateModule,
    PipesModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
