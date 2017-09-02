import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTranslatePipe } from './custom-translate.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CustomTranslatePipe,
    SafeHtmlPipe
  ],
  exports: [
    CustomTranslatePipe,
    SafeHtmlPipe
  ],
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
