import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavSidebarModule } from '@rucken/web';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '../../shared/shared.module';
import { EntitiesPageComponent } from './entities-page.component';
import { EntitiesPageRoutes } from './entities-page.routes';

@NgModule({
  imports: [SharedModule, NgxPermissionsModule.forChild(), NavSidebarModule, RouterModule.forChild(EntitiesPageRoutes)],
  declarations: [EntitiesPageComponent]
})
export class EntitiesPageModule {}
