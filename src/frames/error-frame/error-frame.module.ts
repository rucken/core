import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '@rucken/core';

import { PageHeaderModule } from './../../controls/page-header/page-header.module';
import { ErrorFrameComponent } from './error-frame.component';

@NgModule({
  imports: [
    SharedModule.forRoot(), PageHeaderModule.forRoot()
  ],

  declarations: [
    ErrorFrameComponent
  ],
  exports: [ErrorFrameComponent],
  entryComponents: [ErrorFrameComponent]
})
export class ErrorFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ErrorFrameModule,
      providers: []
    };
  }
}
