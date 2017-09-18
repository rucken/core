import { NgModule, ModuleWithProviders } from '@angular/core';
import { UserSelectInputComponent } from './user-select-input.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule } from '@angular/forms';
import { SelectInputModule } from './../../../controls/select-input/select-input.module';
import { UsersListModalModule } from '../users-list-modal/users-list-modal.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    FormsModule, SharedModule.forRoot(), TooltipModule.forRoot(),
    SelectInputModule.forRoot(), UsersListModalModule.forRoot()
  ],
  declarations: [
    UserSelectInputComponent
  ],
  exports: [UserSelectInputComponent],
  entryComponents: [UserSelectInputComponent]
})
export class UserSelectInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserSelectInputModule,
      providers: []
    };
  }
}
