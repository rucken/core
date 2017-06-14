import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoComponentsPageRoutes } from './components-page.routes';
import { ComponentsPageModule } from './../../../../../../src';

@NgModule({
  imports: [
    ComponentsPageModule.forRoot(),
    RouterModule.forChild(DemoComponentsPageRoutes)
  ]
})
export class DemoComponentsPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoComponentsPageModule,
      providers: []
    };
  }
}
