import { NgModule, ModuleWithProviders } from '@angular/core';
import { RuckenComponents } from './components';

@NgModule({
  declarations: [
    RuckenComponents
  ],
  exports: [
    RuckenComponents
  ]
})
export class RuckenModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: RuckenModule };
  }
}
