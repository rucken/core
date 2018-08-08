import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NavSidebarComponent } from './nav-sidebar.component';
import { PipesModule } from '../../../shared/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgxPermissionsModule,
    RouterModule,
    PipesModule
  ],
  declarations: [NavSidebarComponent],
  exports: [NavSidebarComponent, PipesModule]
})
export class NavSidebarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NavSidebarModule,
      providers: []
    };
  }
}
