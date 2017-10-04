import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { BasePageModule } from './../../base/base-page/base-page.module';
import { PageHeaderModule } from './../../controls/page-header/page-header.module';
import { AccountPageComponent } from './account-page.component';

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
