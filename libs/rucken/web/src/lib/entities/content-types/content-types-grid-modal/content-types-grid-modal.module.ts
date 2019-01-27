import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxBindIOModule } from 'ngx-bind-io';
import { EntityGridModalModule } from '../../../components/entity-grid-modal/entity-grid-modal.module';
import { ContentTypesGridModule } from '../content-types-grid/content-types-grid.module';
import { ContentTypesGridModalComponent } from './content-types-grid-modal.component';
@NgModule({
  imports: [CommonModule, EntityGridModalModule, ContentTypesGridModule, NgxBindIOModule],
  declarations: [ContentTypesGridModalComponent],
  entryComponents: [ContentTypesGridModalComponent],
  exports: [ContentTypesGridModalComponent, EntityGridModalModule, ContentTypesGridModule]
})
export class ContentTypesGridModalModule {}
