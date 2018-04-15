import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EntityGridModalModule } from '../../../others/entity-grid-modal/entity-grid-modal.module';
import { GroupsGridModule } from '../groups-grid/groups-grid.module';
import { GroupsGridModalComponent } from './groups-grid-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
    EntityGridModalModule,
    GroupsGridModule
  ],
  declarations: [
    GroupsGridModalComponent
  ],
  entryComponents: [
    GroupsGridModalComponent
  ],
  exports: [
    GroupsGridModalComponent
  ]
})
export class GroupsGridModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupsGridModalModule,
      providers: []
    };
  }
}
