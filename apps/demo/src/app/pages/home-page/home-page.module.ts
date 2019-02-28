import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HomePageComponent } from './home-page.component';
import { HOME_PAGE_ROUTES } from './home-page.routes';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(HOME_PAGE_ROUTES)],
  declarations: [HomePageComponent]
})
export class HomePageModule {}
