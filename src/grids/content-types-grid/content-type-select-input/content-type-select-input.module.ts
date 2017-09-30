import { SelectInputModule } from './../../../controls/select-input/select-input.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ContentTypeSelectInputComponent } from './content-type-select-input.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FooterButtonsModule } from './../../../controls/footer-buttons/footer-buttons.module';
import { TextInputModule } from './../../../controls/text-input/text-input.module';
import { FormsModule } from '@angular/forms';
import { ContentTypesListModalModule } from './../../../grids/content-types-grid/content-types-list-modal/content-types-list-modal.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { SharedModule } from '@rucken/core';

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
