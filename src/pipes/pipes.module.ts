import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTranslatePipe } from './custom-translate.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CustomTranslatePipe
  ],
  exports: [],
  entryComponents: []
})
export class PipesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PipesModule,
      providers: []
    };
  }
}
