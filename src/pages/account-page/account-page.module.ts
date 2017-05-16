import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPageComponent } from './account-page.component';
import { RouterModule } from '@angular/router';
import { AccountPageRoutes } from './account-page.routes';
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
