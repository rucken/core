import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@rucken/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { EntityGridComponent } from './entity-grid.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    TranslateModule.forChild(),
    PipesModule,
    FontAwesomeModule
  ],
  declarations: [EntityGridComponent],
  entryComponents: [EntityGridComponent],
  exports: [EntityGridComponent, FormsModule, ReactiveFormsModule, PipesModule]
})
export class EntityGridModule {}
