import { NgModule, ModuleWithProviders } from '@angular/core';
import { PageSubHeaderComponent } from './page-sub-header.component';
import { SharedModule } from '../../shared/shared.module';

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
