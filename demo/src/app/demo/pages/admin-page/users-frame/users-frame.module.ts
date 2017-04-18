import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersFrameRoutes } from './users-frame.routes';
import { UsersFrameModule } from '../../../../../../../dist';

@NgModule({
  imports: [
    UsersFrameModule.forRoot(),
    RouterModule.forChild(UsersFrameRoutes)
  ]
})
export class DemoUsersFrameModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoUsersFrameModule,
      providers: []
    };
  }
}
