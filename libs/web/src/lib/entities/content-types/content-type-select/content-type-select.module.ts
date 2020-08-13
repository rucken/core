import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxBindIOModule } from 'ngx-bind-io';
import { EntitySelectModule } from '../../../components/entity-select/entity-select.module';
import { ContentTypesGridModalModule } from '../content-types-grid-modal/content-types-grid-modal.module';
import { ContentTypeSelectComponent } from './content-type-select.component';

@NgModule({
  imports: [CommonModule, EntitySelectModule, ContentTypesGridModalModule, NgxBindIOModule],
  declarations: [ContentTypeSelectComponent],
  exports: [ContentTypeSelectComponent, EntitySelectModule, ContentTypesGridModalModule]
})
export class ContentTypeSelectModule {}
