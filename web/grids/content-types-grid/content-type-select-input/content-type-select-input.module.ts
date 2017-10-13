import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { PipesModule } from '../../../pipes/pipes.module';
import { SharedModule } from '../../../shared/shared.module';
import { FooterButtonsModule } from './../../../controls/footer-buttons/footer-buttons.module';
import { SelectInputModule } from './../../../controls/select-input/select-input.module';
import { TextInputModule } from './../../../controls/text-input/text-input.module';
import {
    ContentTypesListModalModule,
} from './../../../grids/content-types-grid/content-types-list-modal/content-types-list-modal.module';
import { ContentTypeSelectInputComponent } from './content-type-select-input.component';

@NgModule({
  imports: [
    FormsModule, ModalModule.forRoot(), SharedModule.forRoot(),
    ContentTypesListModalModule.forRoot(),
    FooterButtonsModule.forRoot(), TextInputModule.forRoot(),
    PipesModule.forRoot(), TooltipModule.forRoot(), SelectInputModule.forRoot()
  ],

  declarations: [
    ContentTypeSelectInputComponent
  ],
  exports: [ContentTypeSelectInputComponent],
  entryComponents: [ContentTypeSelectInputComponent]
})
export class ContentTypeSelectInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ContentTypeSelectInputModule,
      providers: []
    };
  }
}
