import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersFrameComponent } from './users-frame.component';
import { RouterModule } from '@angular/router';
import { UsersFrameRoutes } from './users-frame.routes';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderModule } from './../../../controls/page-header/page-header.module';
import { UsersGridModule } from './../../../grids/users-grid/users-grid.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
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
