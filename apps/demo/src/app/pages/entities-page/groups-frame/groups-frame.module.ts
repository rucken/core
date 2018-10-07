import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    GroupsGridModule,
    FormsModule
  ],
  declarations: [GroupsFrameComponent]
})
export class GroupsFrameModule { }
