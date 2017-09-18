import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ControlsFrameComponent } from './controls-frame.component';
import { ControlsFrameRoutes } from './controls-frame.routes';
import { RouterModule } from '@angular/router';
import { PageHeaderModule } from './../../../controls/page-header/page-header.module';
import { PageSubHeaderModule } from '../../../controls/page-sub-header/page-sub-header.module';
import { CheckboxesInputModule } from '../../../controls/checkboxes-input/checkboxes-input.module';
import { SharedModule } from '../../../shared/shared.module';

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
