import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTranslatePipe } from './custom-translate.pipe';
import { PermPipe } from './perm.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  declarations: [
    CustomTranslatePipe,
    SafeHtmlPipe,
    PermPipe
  ],
  exports: [
    CustomTranslatePipe,
    SafeHtmlPipe,
    PermPipe
  ]
})
export class PipesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PipesModule,
      providers: []
    };
  }
}
