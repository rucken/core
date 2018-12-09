import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntityGridModule } from '../../../components/entity-grid/entity-grid.module';
import { WebModalsModule } from '../../../modals/modals/modals.module';
import { UserModalModule } from '../user-modal/user-modal.module';
import { UsersGridComponent } from './users-grid.component';

@NgModule({
  imports: [CommonModule, WebModalsModule, EntityGridModule, UserModalModule],
  declarations: [UsersGridComponent],
  exports: [UsersGridComponent, EntityGridModule, UserModalModule]
})
export class UsersGridModule {}
