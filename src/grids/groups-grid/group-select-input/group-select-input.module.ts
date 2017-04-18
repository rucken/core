import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupSelectInputComponent } from './group-select-input.component';
import { TooltipModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { SelectInputModule } from '../../../controls/select-input/select-input.module';
import { TranslateModule } from '@ngx-translate/core';
import { GroupsListModalModule } from '../../../grids/groups-grid/groups-list-modal/groups-list-modal.module';

@NgModule({
  imports: [
    CommonModule, FormsModule, TranslateModule.forChild(), TooltipModule.forRoot(),
    GroupsListModalModule.forRoot(),
    SelectInputModule.forRoot()
  ],
  declarations: [
    GroupSelectInputComponent
  ],
  exports: [GroupSelectInputComponent],
  entryComponents: [GroupSelectInputComponent]
})
export class GroupSelectInputModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupSelectInputModule,
      providers: []
    };
  }
}
