import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { RouterModule } from '@angular/router';
import { DemoHomePageRoutes } from './home-page.routes';
import { PageHeaderModule } from './../../../../../../src';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../../../../../src-inline/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    PageHeaderModule.forRoot(),
    PipesModule.forRoot(),
    RouterModule.forChild(DemoHomePageRoutes)
  ],
  declarations: [HomePageComponent],
  exports: [HomePageComponent],
  entryComponents: [HomePageComponent]
})
export class HomePageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HomePageModule,
      providers: []
    };
  }
}
