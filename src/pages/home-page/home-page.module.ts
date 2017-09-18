import { NgModule, ModuleWithProviders } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { RouterModule } from '@angular/router';
import { HomePageRoutes } from './home-page.routes';
import { PageHeaderModule } from './../../controls/page-header/page-header.module';
import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    PageHeaderModule.forRoot(),
    PipesModule.forRoot()
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
