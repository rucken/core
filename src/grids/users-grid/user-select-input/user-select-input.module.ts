import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSelectInputComponent } from './user-select-input.component';
import { TooltipModule } from 'ng2-bootstrap';
import { FormsModule } from '@angular/forms';
import { SelectInputModule } from '../../../controls/select-input/select-input.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, FormsModule, SharedModule.forRoot(), TooltipModule.forRoot(),
    SelectInputModule.forRoot()
  ],
  declarations: [
    UserSelectInputComponent
  ],
  exports: [UserSelectInputComponent],
  entryComponents: [UserSelectInputComponent]
})
export class UserSelectInputModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserSelectInputModule,
      providers: []
    };
  }
}
