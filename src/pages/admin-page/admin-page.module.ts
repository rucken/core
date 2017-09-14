import { NgModule, ModuleWithProviders } from '@angular/core';
import { AdminPageComponent } from './admin-page.component';
import { RouterModule } from '@angular/router';
import { AdminPageRoutes } from './admin-page.routes';
import { PageHeaderModule } from './../../controls/page-header/page-header.module';
import { BasePageModule } from './../../base/base-page/base-page.module';
import { SharedModule } from '../../shared/shared.module';

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
