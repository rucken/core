import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsListModalComponent } from './permissions-list-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { PermissionsGridModule } from '../permissions-grid.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule, ModalModule.forRoot(), TranslateModule.forChild(),
    PermissionsGridModule.forRoot(), PermissionsGridModule.forRoot()
  ],
  declarations: [
    PermissionsListModalComponent
  ],
  exports: [PermissionsListModalComponent],
  entryComponents: [PermissionsListModalComponent]
})
export class PermissionsListModalModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: PermissionsListModalModule,
      providers: []
    };
  }
}
