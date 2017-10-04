import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { BasePageModule } from './../../base/base-page/base-page.module';
import { PageHeaderModule } from './../../controls/page-header/page-header.module';
import { AdminPageComponent } from './admin-page.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule.forRoot(),
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
