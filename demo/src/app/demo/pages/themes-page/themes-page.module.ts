import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemesPageRoutes } from './themes-page.routes';
import { ThemesPageModule } from '../../../../../../dist';

@NgModule({
  imports: [
    ThemesPageModule.forRoot(),
    RouterModule.forChild(ThemesPageRoutes)
  ]
})
export class DemoThemesPageModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoThemesPageModule,
      providers: []
    };
  }
}
