import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContentTypesGridModule } from '@rucken/web';
import { SharedModule } from '../../../shared/shared.module';
import { ContentTypesFrameComponent } from './content-types-frame.component';
import { ContentTypesFrameRoutes } from './content-types-frame.routes';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    SharedModule,
    NgxPermissionsModule,
    RouterModule.forChild(ContentTypesFrameRoutes),
    ContentTypesGridModule,
    FormsModule
  ],
  declarations: [ContentTypesFrameComponent]
})
export class ContentTypesFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ContentTypesFrameModule,
      providers: []
    };
  }
}
