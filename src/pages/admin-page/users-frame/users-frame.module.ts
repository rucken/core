import { ModuleWithProviders, NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { PageHeaderModule } from './../../../controls/page-header/page-header.module';
import { UsersGridModule } from './../../../grids/users-grid/users-grid.module';
import { UsersFrameComponent } from './users-frame.component';

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
