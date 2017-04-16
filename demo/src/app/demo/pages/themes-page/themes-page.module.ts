import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemesPageComponent } from './themes-page.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ThemesPageRoutes } from './themes-page.routes';
import { PageHeaderModule, SharedModule } from '../../../../../../dist';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
