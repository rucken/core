import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersGridModule } from '@rucken/web';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '../../../shared/shared.module';
import { UsersFrameComponent } from './users-frame.component';
import { USERS_FRAME_ROUTES } from './users-frame.routes';

@NgModule({
  imports: [
    SharedModule,
    NgxPermissionsModule.forChild(),
    RouterModule.forChild(USERS_FRAME_ROUTES),
    UsersGridModule,
    FormsModule
  ],
  declarations: [UsersFrameComponent]
})
export class UsersFrameModule {}
