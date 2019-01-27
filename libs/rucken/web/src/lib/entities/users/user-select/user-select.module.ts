import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxBindIOModule } from 'ngx-bind-io';
import { EntitySelectModule } from '../../../components/entity-select/entity-select.module';
import { UsersGridModalModule } from '../users-grid-modal/users-grid-modal.module';
import { UserSelectComponent } from './user-select.component';

@NgModule({
  imports: [CommonModule, EntitySelectModule, UsersGridModalModule, NgxBindIOModule],
  declarations: [UserSelectComponent],
  exports: [UserSelectComponent, EntitySelectModule, UsersGridModalModule]
})
export class UserSelectModule {}
