import { ModuleWithProviders, NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { PageHeaderModule } from './../../../controls/page-header/page-header.module';
import { AccountProfileFormModule } from './../../../grids/users-grid/account-profile-form/account-profile-form.module';
import { ProfileFrameComponent } from './profile-frame.component';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    PageHeaderModule.forRoot(),
    AccountProfileFormModule.forRoot()
  ],

  declarations: [
    ProfileFrameComponent
  ],
  exports: [ProfileFrameComponent],
  entryComponents: [ProfileFrameComponent]
})
export class ProfileFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProfileFrameModule,
      providers: []
    };
  }
}
