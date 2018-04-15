import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { EntityGridCellDirective } from './entity-grid-cell.directive';
import { EntityGridFieldDirective } from './entity-grid-field.directive';
import { EntityGridComponent } from './entity-grid.component';
import { PipesModule } from '../../../shared/pipes/pipes.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    TranslateModule.forChild(),
    PipesModule
  ],
  declarations: [
    EntityGridComponent,
    EntityGridFieldDirective,
    EntityGridCellDirective
  ],
  exports: [
    EntityGridComponent,
    EntityGridFieldDirective,
    EntityGridCellDirective
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
