import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountPageRoutes } from './account-page.routes';
import { AccountPageModule } from '../../../../../../dist';

@NgModule({
  imports: [
    AccountPageModule.forRoot(),
    RouterModule.forChild(AccountPageRoutes)
  ]
})
export class DemoAccountPageModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoAccountPageModule,
      providers: []
    };
  }
}
