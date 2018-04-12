import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavSidebarModule } from '@rucken/web';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '../../../shared/shared.module';
import { AdminPageComponent } from './admin-page.component';
import { AdminPageRoutes } from './admin-page.routes';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    NavSidebarModule.forRoot(),
    NgxPermissionsModule.forChild(),
    RouterModule.forChild(AdminPageRoutes)
  ],
  declarations: [
    AdminPageComponent
  ]
})
export class AdminPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdminPageModule,
      providers: []
    };
  }
}
