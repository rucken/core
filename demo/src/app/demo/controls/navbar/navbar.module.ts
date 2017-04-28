import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoNavbarComponent } from './navbar.component';
import { ConfirmModalModule, AuthModalModule } from '../../../../../../src';
import { TranslateModule } from '@ngx-translate/core';
import { CollapseModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    ConfirmModalModule.forRoot(),
    AuthModalModule.forRoot(),
    CollapseModule.forRoot()
  ],
  declarations: [
    DemoNavbarComponent
  ],
  exports: [
    DemoNavbarComponent
  ],
  entryComponents: [DemoNavbarComponent]
})
export class DemoNavbarModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoNavbarModule,
      providers: []
    };
  }
}
