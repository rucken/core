import { ModuleWithProviders, NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { PageSubHeaderComponent } from './page-sub-header.component';

@NgModule({
  imports: [SharedModule.forRoot()],
  declarations: [PageSubHeaderComponent],
  exports: [PageSubHeaderComponent],
  entryComponents: [PageSubHeaderComponent]
})
export class PageSubHeaderModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PageSubHeaderModule,
      providers: []
    };
  }
}
