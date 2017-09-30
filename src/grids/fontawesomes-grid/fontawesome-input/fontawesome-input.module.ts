import { NgModule, ModuleWithProviders } from '@angular/core';
import { FontawesomeInputComponent } from './fontawesome-input.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule } from '@angular/forms';
import { FontawesomesListModalModule } from '../fontawesomes-list-modal/fontawesomes-list-modal.module';
import { SharedModule } from '@rucken/core';

@NgModule({
  imports: [
    FormsModule, SharedModule.forRoot(), TooltipModule.forRoot(), FontawesomesListModalModule.forRoot()
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
