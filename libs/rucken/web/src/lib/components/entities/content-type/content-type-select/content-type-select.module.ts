import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntitySelectModule } from '../../../others/entity-select/entity-select.module';
import { ContentTypesGridModalModule } from '../content-types-grid-modal/content-types-grid-modal.module';
import { ContentTypeSelectComponent } from './content-type-select.component';

@NgModule({
  imports: [CommonModule, EntitySelectModule, ContentTypesGridModalModule],
  declarations: [ContentTypeSelectComponent],
  exports: [
    ContentTypeSelectComponent,
    EntitySelectModule,
    ContentTypesGridModalModule
  ]
})
export class ContentTypeSelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ContentTypeSelectModule,
      providers: []
    };
  }
}
