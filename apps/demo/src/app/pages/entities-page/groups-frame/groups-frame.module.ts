import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GroupsGridModule } from '@rucken/web';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '../../../shared/shared.module';
import { GroupsFrameComponent } from './groups-frame.component';
import { GroupsFrameRoutes } from './groups-frame.routes';

@NgModule({
  imports: [
    SharedModule,
    NgxPermissionsModule,
    RouterModule.forChild(GroupsFrameRoutes),
    GroupsGridModule
  ],
  declarations: [GroupsFrameComponent]
})
export class GroupsFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupsFrameModule,
      providers: []
    };
  }
}
