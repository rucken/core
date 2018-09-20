import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntityInputModule } from '../../../components/entity-input/entity-input.module';
import { UsersGridModalModule } from '../users-grid-modal/users-grid-modal.module';
import { UserInputComponent } from './user-input.component';

@NgModule({
  imports: [
    CommonModule,
    EntityInputModule,
    UsersGridModalModule
  ],
  declarations: [
    UserInputComponent
  ],
  exports: [
    UserInputComponent,
    EntityInputModule,
    UsersGridModalModule
  ]
})
export class UserInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserInputModule,
      providers: []
    };
  }
}
