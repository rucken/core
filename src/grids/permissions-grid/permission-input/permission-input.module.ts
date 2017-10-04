import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { SharedModule } from '../../../shared/shared.module';
import { PermissionsListModalModule } from '../permissions-list-modal/permissions-list-modal.module';
import { PermissionInputComponent } from './permission-input.component';

@NgModule({
  imports: [
    FormsModule, SharedModule.forRoot(), TooltipModule.forRoot(), PermissionsListModalModule.forRoot()
  ],
  declarations: [
    PermissionInputComponent
  ],
  exports: [PermissionInputComponent],
  entryComponents: [PermissionInputComponent]
})
export class PermissionInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PermissionInputModule,
      providers: []
    };
  }
}
