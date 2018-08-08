import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MessageModalModule, PipesModule } from '@rucken/web';
import { NgxRepositoryModule } from 'ngx-repository';

@NgModule({
  imports: [
    CommonModule,
    NgxRepositoryModule.forRoot(),
    MessageModalModule.forRoot(),
    PipesModule,
    TranslateModule.forChild()
  ],
  exports: [
    CommonModule,
    NgxRepositoryModule,
    MessageModalModule,
    PipesModule,
    TranslateModule
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
