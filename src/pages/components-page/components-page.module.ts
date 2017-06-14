import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsPageComponent } from './components-page.component';
import { RouterModule } from '@angular/router';
import { ComponentsPageRoutes } from './components-page.routes';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderModule } from './../../controls/page-header/page-header.module';
import { BasePageModule } from './../../base/base-page/base-page.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
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
