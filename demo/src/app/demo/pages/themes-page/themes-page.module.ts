import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoThemesPageRoutes } from './themes-page.routes';
import { ThemesPageModule } from './../../../../../../src';

@NgModule({
  imports: [
    ThemesPageModule.forRoot(),
    RouterModule.forChild(DemoThemesPageRoutes)
  ]
})
export class DemoThemesPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoThemesPageModule,
      providers: []
    };
  }
}
