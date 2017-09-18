import { NgModule, ModuleWithProviders } from '@angular/core';
import { ErrorFrameComponent } from './error-frame.component';
import { PageHeaderModule } from './../../controls/page-header/page-header.module';
import { SharedModule } from '../../shared/shared.module';

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
