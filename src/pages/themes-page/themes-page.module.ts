import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@rucken/core';

import { PageHeaderModule } from './../../controls/page-header/page-header.module';
import { ThemesPageComponent } from './themes-page.component';

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
