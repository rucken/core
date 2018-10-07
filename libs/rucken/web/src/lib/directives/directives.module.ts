import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DisableControlDirective } from './disable-control.directive';
import { FocusedDirective } from './focused.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [FocusedDirective, DisableControlDirective],
  exports: [FocusedDirective, DisableControlDirective]
})
export class DirectivesModule { }
