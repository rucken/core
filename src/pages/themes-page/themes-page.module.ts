import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemesPageComponent } from './themes-page.component';
import { FormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../controls/page-header/page-header.module';
import { RouterModule } from '@angular/router';
import { ThemesPageRoutes } from './themes-page.routes';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    PageHeaderModule.forRoot(),
    RouterModule.forChild(ThemesPageRoutes)
  ],
  declarations: [
    ThemesPageComponent
  ],
  exports: [ThemesPageComponent],
  entryComponents: [ThemesPageComponent]
})
export class ThemesPageModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ThemesPageModule,
      providers: []
    };
  }
}
