import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ConfirmModalModule } from './../../modals/confirm-modal/confirm-modal.module';
import { AuthModalModule } from './../../modals/auth-modal/auth-modal.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
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
