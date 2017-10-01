import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '@rucken/core';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { CheckboxesInputModule } from '../../../controls/checkboxes-input/checkboxes-input.module';
import { PageSubHeaderModule } from '../../../controls/page-sub-header/page-sub-header.module';
import { PageHeaderModule } from './../../../controls/page-header/page-header.module';
import { ControlsFrameComponent } from './controls-frame.component';

@NgModule({
  imports: [
    SharedModule.forRoot(),
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
