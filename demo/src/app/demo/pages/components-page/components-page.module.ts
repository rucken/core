import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsPageModule } from '@rucken/web';

import { DemoComponentsPageRoutes } from './components-page.routes';

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
