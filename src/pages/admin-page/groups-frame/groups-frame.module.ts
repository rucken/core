import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsFrameComponent } from './groups-frame.component';
import { RouterModule } from '@angular/router';
import { GroupsFrameRoutes } from './groups-frame.routes';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderModule } from './../../../controls/page-header/page-header.module';
import { GroupsGridModule } from './../../../grids/groups-grid/groups-grid.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    PageHeaderModule.forRoot(),
    GroupsGridModule.forRoot(),
    // RouterModule.forChild(GroupsFrameRoutes)
  ],
  declarations: [
    GroupsFrameComponent
  ],
  exports: [GroupsFrameComponent],
  entryComponents: [GroupsFrameComponent]
})
export class GroupsFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupsFrameModule,
      providers: []
    };
  }
}
