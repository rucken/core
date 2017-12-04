import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { SharedService } from './services/shared.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  providers: [SharedService],
  exports: [
    CommonModule,
    TranslateModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
