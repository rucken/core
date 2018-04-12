import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EntityGridModalModule } from '../../../others/entity-grid-modal/entity-grid-modal.module';
import { ContentTypesGridModule } from '../content-types-grid/content-types-grid.module';
import { ContentTypesGridModalComponent } from './content-types-grid-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
    EntityGridModalModule.forRoot(),
    ContentTypesGridModule.forRoot()
  ],
  declarations: [
    ContentTypesGridModalComponent
  ],
  entryComponents: [
    ContentTypesGridModalComponent
  ],
  exports: [
    ContentTypesGridModalComponent
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
