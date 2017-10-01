import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '@rucken/core';

import { CustomTranslatePipe } from './custom-translate.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  imports: [
    SharedModule.forRoot()
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
