import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    CollapseModule.forRoot(),
    NgxPermissionsModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NavbarModule,
      providers: []
    };
  }
}
