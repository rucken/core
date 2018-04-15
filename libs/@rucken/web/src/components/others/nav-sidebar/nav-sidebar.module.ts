import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NavSidebarComponent } from './nav-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgxPermissionsModule,
    RouterModule
  ],
  declarations: [
    NavSidebarComponent
  ],
  exports: [
    NavSidebarComponent
  ]
})
export class NavSidebarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NavSidebarModule,
      providers: []
    };
  }
}
