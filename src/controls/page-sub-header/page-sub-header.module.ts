import { NgModule, ModuleWithProviders } from '@angular/core';
import { PageSubHeaderComponent } from './page-sub-header.component';
import { SharedModule } from '@rucken/core';

@NgModule({
  imports: [SharedModule.forRoot()],
  declarations: [PageSubHeaderComponent],
  exports: [PageSubHeaderComponent],
  entryComponents: [PageSubHeaderComponent]
})
export class PageSubHeaderModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PageSubHeaderModule,
      providers: []
    };
  }
}
