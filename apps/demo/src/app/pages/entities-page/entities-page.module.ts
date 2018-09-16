import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavSidebarModule } from '@rucken/web';
import { SharedModule } from '../../shared/shared.module';
import { EntitiesPageComponent } from './entities-page.component';
import { EntitiesPageRoutes } from './entities-page.routes';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    SharedModule,
    NgxPermissionsModule.forChild(),
    NavSidebarModule,
    RouterModule.forChild(EntitiesPageRoutes)
  ],
  declarations: [EntitiesPageComponent]
})
export class EntitiesPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EntitiesPageModule,
      providers: []
    };
  }
}
