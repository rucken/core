import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GroupsGridModule, MessageModalModule, PipesModule } from '@rucken/web';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '../../../../shared/shared.module';
import { GroupsFrameComponent } from './groups-frame.component';
import { GroupsFrameRoutes } from './groups-frame.routes';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    MessageModalModule.forRoot(),
    NgxPermissionsModule.forChild(),
    RouterModule.forChild(GroupsFrameRoutes),
    PipesModule.forRoot(),
    GroupsGridModule.forRoot(),
    FormsModule
  ],
  declarations: [
    GroupsFrameComponent
  ]
})
export class GroupsFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupsFrameModule,
      providers: []
    };
  }
}
