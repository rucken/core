import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormGroupComponent } from './form-group.component';

@NgModule({
  imports: [CommonModule, TooltipModule.forRoot(), TranslateModule.forChild()],
  declarations: [FormGroupComponent],
  exports: [FormGroupComponent]
})
export class FormGroupModule {}
