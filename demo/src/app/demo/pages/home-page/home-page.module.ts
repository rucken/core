import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoHomePageComponent } from './home-page.component';
import { RouterModule } from '@angular/router';
import { DemoHomePageRoutes } from './home-page.routes';
import { PageHeaderModule, SharedModule } from 'rucken';
import { PipesModule } from 'rucken';

@NgModule({
  imports: [
    CommonModule,
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
