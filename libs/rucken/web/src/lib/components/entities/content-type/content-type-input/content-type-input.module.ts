import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntityInputModule } from '../../../others/entity-input/entity-input.module';
import { ContentTypesGridModalModule } from '../content-types-grid-modal/content-types-grid-modal.module';
import { ContentTypeInputComponent } from './content-type-input.component';

@NgModule({
  imports: [CommonModule, EntityInputModule, ContentTypesGridModalModule],
  declarations: [ContentTypeInputComponent],
  exports: [
    ContentTypeInputComponent,
    EntityInputModule,
    ContentTypesGridModalModule
  ]
})
export class ContentTypeInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ContentTypeInputModule,
      providers: []
    };
  }
}
