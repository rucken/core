import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@rucken/core';

import { BasePageModule } from './../../base/base-page/base-page.module';
import { PageHeaderModule } from './../../controls/page-header/page-header.module';
import { ComponentsPageComponent } from './components-page.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule.forRoot(),
    PageHeaderModule.forRoot(),
    BasePageModule.forRoot()
  ],

  declarations: [
    ComponentsPageComponent
  ],
  exports: [ComponentsPageComponent],
  entryComponents: [ComponentsPageComponent]
})
export class ComponentsPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ComponentsPageModule,
      providers: []
    };
  }
}
