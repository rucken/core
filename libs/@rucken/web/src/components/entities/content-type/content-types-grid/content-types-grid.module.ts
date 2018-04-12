import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { EntityGridModule } from '../../../others/entity-grid/entity-grid.module';
import { EntityModalModule } from '../../../others/entity-modal/entity-modal.module';
import { ContentTypeModalModule } from '../content-type-modal/content-type-modal.module';
import { ContentTypesGridComponent } from './content-types-grid.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    EntityGridModule.forRoot(),
    EntityModalModule.forRoot(),
    ContentTypeModalModule.forRoot(),
    ModalModule.forRoot(),
    PipesModule.forRoot()
  ],
  declarations: [
    ContentTypesGridComponent
  ],
  exports: [
    ContentTypesGridComponent
  ]
})
export class ContentTypesGridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ContentTypesGridModule,
      providers: []
    };
  }
}
