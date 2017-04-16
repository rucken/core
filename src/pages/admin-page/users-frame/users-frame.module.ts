import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersFrameComponent } from './users-frame.component';
import { UsersGridModule } from '../../../grids/users-grid/users-grid.module';
import { PageHeaderModule } from '../../../controls/page-header/page-header.module';
import { RouterModule } from '@angular/router';
import { UsersFrameRoutes } from './users-frame.routes';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    PageHeaderModule.forRoot(),
    RouterModule.forChild(UsersFrameRoutes),
    UsersGridModule.forRoot()
  ],
  declarations: [
    UsersFrameComponent
  ],
  exports: [UsersFrameComponent],
  entryComponents: [UsersFrameComponent]
})
export class UsersFrameModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: UsersFrameModule,
      providers: []
    };
  }
}
