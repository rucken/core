import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EntityGridModalModule } from '../../../others/entity-grid-modal/entity-grid-modal.module';
import { UsersGridModule } from '../users-grid/users-grid.module';
import { UsersGridModalComponent } from './users-grid-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
    EntityGridModalModule.forRoot(),
    UsersGridModule.forRoot()
  ],
  declarations: [
    UsersGridModalComponent
  ],
  entryComponents: [
    UsersGridModalComponent
  ],
  exports: [
    UsersGridModalComponent
  ]
})
export class UsersGridModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UsersGridModalModule,
      providers: []
    };
  }
}
