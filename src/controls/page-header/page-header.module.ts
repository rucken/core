import { NgModule, ModuleWithProviders } from '@angular/core';
import { PageHeaderComponent } from './page-header.component';
import { SharedModule } from '@rucken/core';

@NgModule({
  imports: [SharedModule.forRoot()],
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
