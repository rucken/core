import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersFrameModule } from '@rucken/web';

import { DemoUsersFrameRoutes } from './users-frame.routes';

@NgModule({
  imports: [
    UsersFrameModule.forRoot(),
    RouterModule.forChild(DemoUsersFrameRoutes)
  ]
})
export class DemoUsersFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoUsersFrameModule,
      providers: []
    };
  }
}
