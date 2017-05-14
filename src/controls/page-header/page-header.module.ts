import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, TranslateModule.forChild()],
  declarations: [PageHeaderComponent],
  exports: [PageHeaderComponent],
  entryComponents: [PageHeaderComponent]
})
export class PageHeaderModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PageHeaderModule,
      providers: []
    };
  }
}
