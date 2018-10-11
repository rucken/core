import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavSidebarModule } from '@rucken/web';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '../../shared/shared.module';
import { AdminPageComponent } from './admin-page.component';
import { AdminPageRoutes } from './admin-page.routes';

@NgModule({
  imports: [SharedModule, NgxPermissionsModule.forChild(), NavSidebarModule, RouterModule.forChild(AdminPageRoutes)],
  declarations: [AdminPageComponent]
})
export class AdminPageModule {}
