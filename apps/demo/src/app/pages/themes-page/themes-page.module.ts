import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ThemesPageComponent } from './themes-page.component';
import { THEMES_PAGE_ROUTES } from './themes-page.routes';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(THEMES_PAGE_ROUTES)],
  declarations: [ThemesPageComponent]
})
export class ThemesPageModule {}
