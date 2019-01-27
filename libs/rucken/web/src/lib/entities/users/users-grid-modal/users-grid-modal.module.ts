import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxBindIOModule } from 'ngx-bind-io';
import { UsersGridModule } from '../users-grid/users-grid.module';
import { UsersGridModalComponent } from './users-grid-modal.component';

@NgModule({
  imports: [CommonModule, UsersGridModule, NgxBindIOModule],
  declarations: [UsersGridModalComponent],
  entryComponents: [UsersGridModalComponent],
  exports: [UsersGridModalComponent, UsersGridModule]
})
export class UsersGridModalModule {}
