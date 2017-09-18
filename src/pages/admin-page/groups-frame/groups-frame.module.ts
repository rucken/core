import { NgModule, ModuleWithProviders } from '@angular/core';
import { GroupsFrameComponent } from './groups-frame.component';
import { RouterModule } from '@angular/router';
import { GroupsFrameRoutes } from './groups-frame.routes';
import { PageHeaderModule } from './../../../controls/page-header/page-header.module';
import { GroupsGridModule } from './../../../grids/groups-grid/groups-grid.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    PageHeaderModule.forRoot(),
    GroupsGridModule.forRoot()
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
