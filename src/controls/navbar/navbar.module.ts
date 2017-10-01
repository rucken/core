import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@rucken/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';

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
