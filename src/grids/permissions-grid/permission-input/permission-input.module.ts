import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionInputComponent } from './permission-input.component';
import { TooltipModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule, FormsModule, TranslateModule.forChild(), TooltipModule.forRoot()
  ],
  declarations: [
    PermissionInputComponent
  ],
  exports: [PermissionInputComponent],
  entryComponents: [PermissionInputComponent]
})
export class PermissionInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PermissionInputModule,
      providers: []
    };
  }
}
