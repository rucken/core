import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PermissionsGridModule } from '@rucken/web';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '../../../shared/shared.module';
import { PermissionsFrameComponent } from './permissions-frame.component';
import { PERMISSIONS_FRAME_ROUTES } from './permissions-frame.routes';

@NgModule({
  imports: [
    SharedModule,
    NgxPermissionsModule.forChild(),
    RouterModule.forChild(PERMISSIONS_FRAME_ROUTES),
    PermissionsGridModule,
    FormsModule
  ],
  declarations: [PermissionsFrameComponent]
})
export class PermissionsFrameModule {}
