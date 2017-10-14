import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountPageModule } from '@rucken/web';

import { DemoAccountPageRoutes } from './account-page.routes';

@NgModule({
  imports: [
    AccountPageModule.forRoot(),
    RouterModule.forChild(DemoAccountPageRoutes)
  ]
})
export class DemoAccountPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoAccountPageModule,
      providers: []
    };
  }
}
