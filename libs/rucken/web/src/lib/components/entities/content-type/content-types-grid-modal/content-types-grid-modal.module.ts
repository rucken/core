import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntityGridModalModule } from '../../../others/entity-grid-modal/entity-grid-modal.module';
import { ContentTypesGridModule } from '../content-types-grid/content-types-grid.module';
import { ContentTypesGridModalComponent } from './content-types-grid-modal.component';

@NgModule({
  imports: [CommonModule, EntityGridModalModule, ContentTypesGridModule],
  declarations: [ContentTypesGridModalComponent],
  entryComponents: [ContentTypesGridModalComponent],
  exports: [
    ContentTypesGridModalComponent,
    EntityGridModalModule,
    ContentTypesGridModule
  ]
})
export class ContentTypesGridModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ContentTypesGridModalModule,
      providers: []
    };
  }
}
