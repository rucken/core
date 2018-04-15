import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { EntityGridModule } from '../../../others/entity-grid/entity-grid.module';
import { EntityModalModule } from '../../../others/entity-modal/entity-modal.module';
import { UserModalModule } from '../user-modal/user-modal.module';
import { UsersGridComponent } from './users-grid.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    EntityGridModule,
    EntityModalModule,
    UserModalModule,
    ModalModule.forRoot(),
    PipesModule
  ],
  declarations: [
    UsersGridComponent
  ],
  exports: [
    UsersGridComponent
  ]
})
export class UsersGridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UsersGridModule,
      providers: []
    };
  }
}
