import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSubHeaderComponent } from './page-sub-header.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, TranslateModule.forChild()],
  declarations: [PageSubHeaderComponent],
  exports: [PageSubHeaderComponent],
  entryComponents: [PageSubHeaderComponent]
})
export class PageSubHeaderModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: PageSubHeaderModule,
      providers: []
    };
  }
}
