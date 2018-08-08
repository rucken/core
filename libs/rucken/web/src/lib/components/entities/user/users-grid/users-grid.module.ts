import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntityGridModule } from '../../../others/entity-grid/entity-grid.module';
import { UserModalModule } from '../user-modal/user-modal.module';
import { UsersGridComponent } from './users-grid.component';

@NgModule({
  imports: [CommonModule, EntityGridModule, UserModalModule],
  declarations: [UsersGridComponent],
  exports: [UsersGridComponent, EntityGridModule, UserModalModule]
})
export class UsersGridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UsersGridModule,
      providers: []
    };
  }
}
