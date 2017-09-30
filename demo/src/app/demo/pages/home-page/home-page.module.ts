import { NgModule, ModuleWithProviders } from '@angular/core';
import { DemoHomePageComponent } from './home-page.component';
import { RouterModule } from '@angular/router';
import { DemoHomePageRoutes } from './home-page.routes';
import { PageHeaderModule } from '@rucken/web';
import { PipesModule } from '@rucken/web';
import { SharedModule } from '@rucken/core';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    PageHeaderModule.forRoot(),
    PipesModule.forRoot(),
    RouterModule.forChild(DemoHomePageRoutes)
  ],
  declarations: [DemoHomePageComponent],
  exports: [DemoHomePageComponent],
  entryComponents: [DemoHomePageComponent]
})
export class DemoHomePageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoHomePageModule,
      providers: []
    };
  }
}
