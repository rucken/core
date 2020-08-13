import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxBindIOModule } from 'ngx-bind-io';
import { EntityInputModule } from '../../../components/entity-input/entity-input.module';
import { ContentTypesGridModalModule } from '../content-types-grid-modal/content-types-grid-modal.module';
import { ContentTypeInputComponent } from './content-type-input.component';

@NgModule({
  imports: [CommonModule, EntityInputModule, ContentTypesGridModalModule, NgxBindIOModule],
  declarations: [ContentTypeInputComponent],
  exports: [ContentTypeInputComponent, EntityInputModule, ContentTypesGridModalModule]
})
export class ContentTypeInputModule {}
