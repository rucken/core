import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFrameComponent } from './profile-frame.component';
import { PageHeaderModule } from '../../../controls/page-header/page-header.module';
import { AccountProfileFormModule } from '../../../grids/users-grid/account-profile-form/account-profile-form.module';
import { ProfileFrameRoutes } from './profile-frame.routes';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    PageHeaderModule.forRoot(),
    RouterModule.forChild(ProfileFrameRoutes),
    AccountProfileFormModule.forRoot()
  ],
  declarations: [
    ProfileFrameComponent
  ],
  exports: [ProfileFrameComponent],
  entryComponents: [ProfileFrameComponent]
})
export class ProfileFrameModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProfileFrameModule,
      providers: []
    };
  }
}
