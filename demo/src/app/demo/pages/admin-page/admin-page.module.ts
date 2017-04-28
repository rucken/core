import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminPageRoutes } from './admin-page.routes';
import { AdminPageModule } from '../../../../../../src';

@NgModule({
  imports: [
    AdminPageModule.forRoot(),
    RouterModule.forChild(AdminPageRoutes)
  ]
})
export class DemoAdminPageModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoAdminPageModule,
      providers: []
    };
  }
}
