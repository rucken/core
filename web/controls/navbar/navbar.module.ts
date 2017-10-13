import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { SharedModule } from '../../shared/shared.module';
import { AuthModalModule } from './../../modals/auth-modal/auth-modal.module';
import { ConfirmModalModule } from './../../modals/confirm-modal/confirm-modal.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [
    ConfirmModalModule.forRoot(),
    AuthModalModule.forRoot(),
    SharedModule.forRoot(),
    CollapseModule.forRoot(),
    RouterModule
  ],

  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  entryComponents: [NavbarComponent]
})
export class NavbarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NavbarModule,
      providers: []
    };
  }
}
