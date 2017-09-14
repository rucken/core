import { NgModule, ModuleWithProviders } from '@angular/core';
import { ComponentsPageComponent } from './components-page.component';
import { RouterModule } from '@angular/router';
import { ComponentsPageRoutes } from './components-page.routes';
import { PageHeaderModule } from './../../controls/page-header/page-header.module';
import { BasePageModule } from './../../base/base-page/base-page.module';
import { SharedModule } from '../../shared/shared.module';

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
