import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoAdminPageRoutes } from './admin-page.routes';
import { AdminPageModule } from './../../../../../../dist';

@NgModule({
  imports: [
    AdminPageModule.forRoot(),
    RouterModule.forChild(DemoAdminPageRoutes)
  ]
})
export class DemoAdminPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoAdminPageModule,
      providers: []
    };
  }
}
