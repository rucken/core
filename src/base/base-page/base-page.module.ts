import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@rucken/core';

import { PageHeaderModule } from './../../controls/page-header/page-header.module';
import { BasePageComponent } from './base-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule.forRoot(),
    PageHeaderModule.forRoot()
  ],
  declarations: [
    BasePageComponent
  ],
  exports: [
    BasePageComponent],
  entryComponents: [BasePageComponent]
})
export class BasePageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BasePageModule,
      providers: []
    };
  }
}
