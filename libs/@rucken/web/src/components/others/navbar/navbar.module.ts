import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NavbarComponent } from './navbar.component';
import { PipesModule } from '../../../shared/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    CollapseModule.forRoot(),
    NgxPermissionsModule,
    RouterModule,
    PipesModule
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent,
    PipesModule
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
