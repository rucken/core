import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '@rucken/core';

import { PageHeaderComponent } from './page-header.component';

@NgModule({
  imports: [SharedModule.forRoot()],
  declarations: [PageHeaderComponent],
  exports: [PageHeaderComponent],
  entryComponents: [PageHeaderComponent]
})
export class PageHeaderModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PageHeaderModule,
      providers: []
    };
  }
}
