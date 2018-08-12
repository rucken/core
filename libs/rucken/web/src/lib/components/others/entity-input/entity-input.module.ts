import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntityInputComponent } from './entity-input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [EntityInputComponent],
  exports: [EntityInputComponent]
})
export class EntityInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EntityInputModule,
      providers: []
    };
  }
}
