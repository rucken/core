import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GroupsFrameModule } from '@rucken/web';

import { DemoGroupsFrameRoutes } from './groups-frame.routes';

@NgModule({
  imports: [
    GroupsFrameModule.forRoot(),
    RouterModule.forChild(DemoGroupsFrameRoutes)
  ]
})
export class DemoGroupsFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupsFrameModule,
      providers: []
    };
  }
}
