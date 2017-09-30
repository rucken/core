import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule, TranslateFakeLoader, TranslateLoader } from '@ngx-translate/core';
import { TranslateStore } from '@ngx-translate/core/src/translate.store';
import { SharedService } from './services/shared.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  providers: [SharedService],
  exports: [
    CommonModule,
    TranslateModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [TranslateStore]
    };
  }
}
