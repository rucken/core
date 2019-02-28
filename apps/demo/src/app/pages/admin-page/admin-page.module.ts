import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavSidebarModule } from '@rucken/web';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '../../shared/shared.module';
import { AdminPageComponent } from './admin-page.component';
import { ADMIN_PAGE_ROUTES } from './admin-page.routes';

@NgModule({
  imports: [SharedModule, NgxPermissionsModule.forChild(), NavSidebarModule, RouterModule.forChild(ADMIN_PAGE_ROUTES)],
  declarations: [AdminPageComponent]
})
export class AdminPageModule {}
