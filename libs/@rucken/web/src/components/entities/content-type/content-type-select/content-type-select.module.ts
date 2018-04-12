import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EntitySelectModule } from '../../../others/entity-select/entity-select.module';
import { ContentTypesGridModalModule } from '../content-types-grid-modal/content-types-grid-modal.module';
import { ContentTypeSelectComponent } from './content-type-select.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    EntitySelectModule.forRoot(),
    ContentTypesGridModalModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    ContentTypeSelectComponent
  ],
  exports: [
    ContentTypeSelectComponent
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
