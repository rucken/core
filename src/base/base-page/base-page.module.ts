import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasePageComponent } from './base-page.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderModule } from './../../controls/page-header/page-header.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
    PageHeaderModule.forRoot()
  ],
  declarations: [
    BasePageComponent
  ],
  exports: [BasePageComponent],
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
