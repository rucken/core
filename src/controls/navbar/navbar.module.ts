import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { CollapseModule } from 'ngx-bootstrap';
import { ConfirmModalModule } from './../../modals/confirm-modal/confirm-modal.module';
import { AuthModalModule } from './../../modals/auth-modal/auth-modal.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ConfirmModalModule.forRoot(),
    AuthModalModule.forRoot(),
    TranslateModule.forChild(),
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
