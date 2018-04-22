import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { MessageModalModule } from '../../modals/message-modal/message-modal.module';
import { EntityGridCellDirective } from './entity-grid-cell.directive';
import { EntityGridFieldDirective } from './entity-grid-field.directive';
import { EntityGridComponent } from './entity-grid.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    TranslateModule.forChild(),
    PipesModule,
    MessageModalModule,
    ModalModule.forRoot()
  ],
  declarations: [
    EntityGridComponent,
    EntityGridFieldDirective,
    EntityGridCellDirective
  ],
  entryComponents: [
    EntityGridComponent
  ],
  exports: [
    EntityGridComponent,
    EntityGridFieldDirective,
    EntityGridCellDirective,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    MessageModalModule
  ]
})
export class EntityGridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EntityGridModule,
      providers: []
    };
  }
}
