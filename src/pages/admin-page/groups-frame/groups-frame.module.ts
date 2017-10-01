import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '@rucken/core';

import { PageHeaderModule } from './../../../controls/page-header/page-header.module';
import { GroupsGridModule } from './../../../grids/groups-grid/groups-grid.module';
import { GroupsFrameComponent } from './groups-frame.component';

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
