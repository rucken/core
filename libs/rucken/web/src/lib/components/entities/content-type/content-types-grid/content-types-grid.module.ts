import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntityGridModule } from '../../../others/entity-grid/entity-grid.module';
import { ContentTypeModalModule } from '../content-type-modal/content-type-modal.module';
import { ContentTypesGridComponent } from './content-types-grid.component';

@NgModule({
  imports: [CommonModule, EntityGridModule, ContentTypeModalModule],
  declarations: [ContentTypesGridComponent],
  exports: [ContentTypesGridComponent, EntityGridModule, ContentTypeModalModule]
})
export class ContentTypesGridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ContentTypesGridModule,
      providers: []
    };
  }
}
