import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { FontawesomesListModalModule } from '../fontawesomes-list-modal/fontawesomes-list-modal.module';
import { FontawesomeInputComponent } from './fontawesome-input.component';
import { SharedModule } from '../../../shared/shared.module';

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
