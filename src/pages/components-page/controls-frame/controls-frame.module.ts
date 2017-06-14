import { TabsModule } from 'ngx-bootstrap';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsFrameComponent } from './controls-frame.component';
import { ControlsFrameRoutes } from './controls-frame.routes';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderModule } from './../../../controls/page-header/page-header.module';
import { PageSubHeaderModule } from '../../../controls/page-sub-header/page-sub-header.module';
import { CheckboxesInputModule } from '../../../controls/checkboxes-input/checkboxes-input.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    PageHeaderModule.forRoot(),
    TabsModule.forRoot(),
    PageHeaderModule.forRoot(),
    PageSubHeaderModule.forRoot(),
    CheckboxesInputModule.forRoot()
  ],
  declarations: [
    ControlsFrameComponent
  ],
  exports: [ControlsFrameComponent],
  entryComponents: [ControlsFrameComponent]
})
export class ControlsFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ControlsFrameModule,
      providers: []
    };
  }
}
