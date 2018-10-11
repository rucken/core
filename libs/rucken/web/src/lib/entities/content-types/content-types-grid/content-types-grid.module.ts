import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntityGridModule } from '../../../components/entity-grid/entity-grid.module';
import { ContentTypeModalModule } from '../content-type-modal/content-type-modal.module';
import { ContentTypesGridComponent } from './content-types-grid.component';

@NgModule({
  imports: [CommonModule, EntityGridModule, ContentTypeModalModule],
  declarations: [ContentTypesGridComponent],
  exports: [ContentTypesGridComponent, EntityGridModule, ContentTypeModalModule]
})
export class ContentTypesGridModule {}
