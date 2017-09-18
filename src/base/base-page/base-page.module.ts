import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasePageComponent } from './base-page.component';
import { RouterModule } from '@angular/router';
import { PageHeaderModule } from './../../controls/page-header/page-header.module';
import { SharedModule } from '../../shared/shared.module';

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
