import { NgModule, ModuleWithProviders } from '@angular/core';
import { ProfileFrameComponent } from './profile-frame.component';
import { ProfileFrameRoutes } from './profile-frame.routes';
import { RouterModule } from '@angular/router';
import { PageHeaderModule } from './../../../controls/page-header/page-header.module';
import { AccountProfileFormModule } from './../../../grids/users-grid/account-profile-form/account-profile-form.module';
import { SharedModule } from '@rucken/core';

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
