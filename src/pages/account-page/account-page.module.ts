import { NgModule, ModuleWithProviders } from '@angular/core';
import { AccountPageComponent } from './account-page.component';
import { RouterModule } from '@angular/router';
import { AccountPageRoutes } from './account-page.routes';
import { PageHeaderModule } from './../../controls/page-header/page-header.module';
import { BasePageModule } from './../../base/base-page/base-page.module';
import { SharedModule } from '@rucken/core';

@NgModule({
  imports: [
    RouterModule,
    SharedModule.forRoot(),
    PageHeaderModule.forRoot(),
    BasePageModule.forRoot()
  ],
  declarations: [
    AccountPageComponent
  ],
  exports: [AccountPageComponent],
  entryComponents: [AccountPageComponent]
})
export class AccountPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AccountPageModule,
      providers: []
    };
  }
}
