import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EntityInputComponent } from './entity-input.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [EntityInputComponent],
  exports: [EntityInputComponent]
})
export class EntityInputModule {}
