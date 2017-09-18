import { NgModule, ModuleWithProviders } from '@angular/core';
import { ThemesPageComponent } from './themes-page.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ThemesPageRoutes } from './themes-page.routes';
import { PageHeaderModule } from './../../controls/page-header/page-header.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    FormsModule,
    SharedModule.forRoot(),
    PageHeaderModule.forRoot()
  ],

  declarations: [
    ThemesPageComponent
  ],
  exports: [ThemesPageComponent],
  entryComponents: [ThemesPageComponent]
})
export class ThemesPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ThemesPageModule,
      providers: []
    };
  }
}
