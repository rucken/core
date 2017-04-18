import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFrameComponent } from './profile-frame.component';
import { ProfileFrameRoutes } from './profile-frame.routes';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderModule } from '../../../controls/page-header/page-header.module';
import { AccountProfileFormModule } from '../../../grids/users-grid/account-profile-form/account-profile-form.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    PageHeaderModule.forRoot(),
    AccountProfileFormModule.forRoot(),
    //RouterModule.forChild(ProfileFrameRoutes)
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
