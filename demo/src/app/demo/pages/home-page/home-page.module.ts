import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { RouterModule } from '@angular/router';
import { HomePageRoutes } from './home-page.routes';
import { PageHeaderModule } from './../../../../../../dist';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    PageHeaderModule.forRoot(),
    RouterModule.forChild(HomePageRoutes)
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
