import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FakeMissingTranslationHandler,
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule
} from '@ngx-translate/core';
import { Http, HttpModule } from '@angular/http';

export function HttpLoaderFactory(http: Http) {
  return new TranslateFakeLoader();
}
export class MyMissingTranslationHandler implements FakeMissingTranslationHandler {
  handle(params: any) {
    return '';
  }
}
@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateFakeLoader
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MyMissingTranslationHandler
      }
    })
  ],
  exports: [
    CommonModule,
    TranslateModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
