import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MessageModalModule } from '../../../modals/message-modal/message-modal.module';
import { EntityInputModule } from '../../../others/entity-input/entity-input.module';
import { ContentTypesGridModalModule } from '../content-types-grid-modal/content-types-grid-modal.module';
import { ContentTypeInputComponent } from './content-type-input.component';

@NgModule({
  imports: [
    CommonModule,
    MessageModalModule,
    TranslateModule.forChild(),
    EntityInputModule,
    ContentTypesGridModalModule,
    ModalModule.forRoot()
  ],
  declarations: [
    ContentTypeInputComponent
  ],
  exports: [
    ContentTypeInputComponent
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
