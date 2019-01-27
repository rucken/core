import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxBindIOModule } from 'ngx-bind-io';
import { EntityInputModule } from '../../../components/entity-input/entity-input.module';
import { UsersGridModalModule } from '../users-grid-modal/users-grid-modal.module';
import { UserInputComponent } from './user-input.component';

@NgModule({
  imports: [CommonModule, EntityInputModule, UsersGridModalModule, NgxBindIOModule],
  declarations: [UserInputComponent],
  exports: [UserInputComponent, EntityInputModule, UsersGridModalModule]
})
export class UserInputModule {}
