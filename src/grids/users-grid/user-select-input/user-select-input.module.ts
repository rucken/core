import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@rucken/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { UsersListModalModule } from '../users-list-modal/users-list-modal.module';
import { SelectInputModule } from './../../../controls/select-input/select-input.module';
import { UserSelectInputComponent } from './user-select-input.component';

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
