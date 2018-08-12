import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FocusedDirective } from './focused.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [FocusedDirective],
  exports: [FocusedDirective]
})
export class DirectivesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DirectivesModule,
      providers: []
    };
  }
}
