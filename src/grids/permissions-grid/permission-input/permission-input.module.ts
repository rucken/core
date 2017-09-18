import { NgModule, ModuleWithProviders } from '@angular/core';
import { PermissionInputComponent } from './permission-input.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule } from '@angular/forms';
import { PermissionsListModalModule } from '../permissions-list-modal/permissions-list-modal.module';
import { SharedModule } from '../../../shared/shared.module';

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
