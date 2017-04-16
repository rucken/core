import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsFrameComponent } from './groups-frame.component';
import { GroupsGridModule } from '../../../grids/groups-grid/groups-grid.module';
import { PageHeaderModule } from '../../../controls/page-header/page-header.module';
import { RouterModule } from '@angular/router';
import { GroupsFrameRoutes } from './groups-frame.routes';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    PageHeaderModule.forRoot(),
    RouterModule.forChild(GroupsFrameRoutes),
    GroupsGridModule.forRoot()
  ],
  declarations: [
    GroupsFrameComponent
  ],
  exports: [GroupsFrameComponent],
  entryComponents: [GroupsFrameComponent]
})
export class GroupsFrameModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupsFrameModule,
      providers: []
    };
  }
}
