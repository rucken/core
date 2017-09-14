import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule, TranslateFakeLoader, TranslateLoader } from '@ngx-translate/core';
import { TranslateStore } from '@ngx-translate/core/src/translate.store';
import { SharedService, SharedModule } from 'rucken';

@NgModule({
  imports: [
    SharedModule,
    TranslateModule.forChild()
  ],
  providers: [SharedService],
  exports: [
    TranslateModule
  ]
})
export class DemoSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoSharedModule,
      providers: [TranslateStore]
    };
  }
}
