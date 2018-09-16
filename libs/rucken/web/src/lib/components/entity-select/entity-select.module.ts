import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntitySelectComponent } from './entity-select.component';

@NgModule({
  imports: [CommonModule],
  declarations: [EntitySelectComponent],
  exports: [EntitySelectComponent]
})
export class EntitySelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EntitySelectModule,
      providers: []
    };
  }
}
