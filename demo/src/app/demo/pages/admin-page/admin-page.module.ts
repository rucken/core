import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminPageModule } from '@rucken/web';

import { DemoAdminPageRoutes } from './admin-page.routes';

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
