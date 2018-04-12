import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersGridModule, MessageModalModule, PipesModule } from '@rucken/web';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '../../../../shared/shared.module';
import { UsersFrameComponent } from './users-frame.component';
import { UsersFrameRoutes } from './users-frame.routes';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    MessageModalModule.forRoot(),
    NgxPermissionsModule.forChild(),
    RouterModule.forChild(UsersFrameRoutes),
    PipesModule.forRoot(),
    UsersGridModule.forRoot(),
    FormsModule
  ],
  declarations: [
    UsersFrameComponent
  ]
})
export class UsersFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UsersFrameModule,
      providers: []
    };
  }
}
