import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EntityGridModalModule } from '../../../others/entity-grid-modal/entity-grid-modal.module';
import { PermissionsGridModule } from '../permissions-grid/permissions-grid.module';
import { PermissionsGridModalComponent } from './permissions-grid-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
    EntityGridModalModule.forRoot(),
    PermissionsGridModule.forRoot()
  ],
  declarations: [
    PermissionsGridModalComponent
  ],
  entryComponents: [
    PermissionsGridModalComponent
  ],
  exports: [
    PermissionsGridModalComponent
  ]
})
export class PermissionsGridModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PermissionsGridModalModule,
      providers: []
    };
  }
}
