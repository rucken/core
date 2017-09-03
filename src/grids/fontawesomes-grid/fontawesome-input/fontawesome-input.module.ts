import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontawesomeInputComponent } from './fontawesome-input.component';
import { TooltipModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FontawesomesListModalModule } from '../fontawesomes-list-modal/fontawesomes-list-modal.module';
@NgModule({
  imports: [
    CommonModule, FormsModule, TranslateModule.forChild(), TooltipModule.forRoot(), FontawesomesListModalModule.forRoot()
  ],
  declarations: [
    FontawesomeInputComponent
  ],
  exports: [FontawesomeInputComponent],
  entryComponents: [FontawesomeInputComponent]
})
export class FontawesomeInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FontawesomeInputModule,
      providers: []
    };
  }
}
