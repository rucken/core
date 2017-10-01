import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '@rucken/core';

import { PipesModule } from '../../pipes/pipes.module';
import { PageHeaderModule } from './../../controls/page-header/page-header.module';
import { HomePageComponent } from './home-page.component';

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
