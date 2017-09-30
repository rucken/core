import { NgModule, ModuleWithProviders } from '@angular/core';
import { DemoNavbarComponent } from './navbar.component';
import { ConfirmModalModule, AuthModalModule, PipesModule } from '@rucken/web';
import { CollapseModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@rucken/core';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    ConfirmModalModule.forRoot(),
    AuthModalModule.forRoot(),
    CollapseModule.forRoot(),
    PipesModule.forRoot(),
    RouterModule
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
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoNavbarModule,
      providers: []
    };
  }
}
