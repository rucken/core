import { NgModule, ModuleWithProviders } from '@angular/core';
import { CustomTranslatePipe } from './custom-translate.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SharedModule } from '../shared/shared.module';

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
