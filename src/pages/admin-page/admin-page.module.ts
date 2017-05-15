import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page.component';
import { RouterModule } from '@angular/router';
import { AdminPageRoutes } from './admin-page.routes';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderModule } from './../../controls/page-header/page-header.module';
import { BasePageModule } from './../../base/base-page/base-page.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
    PageHeaderModule.forRoot(),
    BasePageModule.forRoot()
  ],
  declarations: [
    AdminPageComponent
  ],
  exports: [AdminPageComponent],
  entryComponents: [AdminPageComponent]
})
export class AdminPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdminPageModule,
      providers: []
    };
  }
}
