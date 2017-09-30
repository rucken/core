import { NgModule, ModuleWithProviders } from '@angular/core';
import { UsersFrameComponent } from './users-frame.component';
import { RouterModule } from '@angular/router';
import { UsersFrameRoutes } from './users-frame.routes';
import { PageHeaderModule } from './../../../controls/page-header/page-header.module';
import { UsersGridModule } from './../../../grids/users-grid/users-grid.module';
import { SharedModule } from '@rucken/core';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    PageHeaderModule.forRoot(),
    UsersGridModule.forRoot()
  ],
  declarations: [
    UsersFrameComponent
  ],
  exports: [UsersFrameComponent],
  entryComponents: [UsersFrameComponent]
})
export class UsersFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UsersFrameModule,
      providers: []
    };
  }
}
