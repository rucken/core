import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GroupsFrameRoutes } from './groups-frame.routes';
import { GroupsFrameModule } from '../../../../../../../src';

@NgModule({
  imports: [
    GroupsFrameModule.forRoot(),
    RouterModule.forChild(GroupsFrameRoutes)
  ]
})
export class DemoGroupsFrameModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupsFrameModule,
      providers: []
    };
  }
}
