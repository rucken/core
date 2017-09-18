import { NgModule, ModuleWithProviders } from '@angular/core';
import { DemoNavbarComponent } from './navbar.component';
import { ConfirmModalModule, AuthModalModule, PipesModule, SharedModule } from 'rucken';
import { CollapseModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

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
