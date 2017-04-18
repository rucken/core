import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorFrameComponent } from './error-frame.component';
import { PageHeaderModule } from '../../controls/page-header/page-header.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule, TranslateModule.forChild(), PageHeaderModule.forRoot()
  ],
  declarations: [
    ErrorFrameComponent
  ],
  exports: [ErrorFrameComponent],
  entryComponents: [ErrorFrameComponent]
})
export class ErrorFrameModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ErrorFrameModule,
      providers: []
    };
  }
}
