import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DisableControlDirective } from './disable-control.directive';
import { FocusedDirective } from './focused.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FocusedDirective,
    DisableControlDirective
  ],
  exports: [
    FocusedDirective,
    DisableControlDirective
  ]
})
export class DirectivesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DirectivesModule,
      providers: []
    };
  }
}
