import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThemesPageComponent } from './pages/themes-page/themes-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { UsersFrameComponent } from './pages/admin-page/users-frame/users-frame.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { ProfileFrameComponent } from './pages/account-page/profile-frame/profile-frame.component';
import { GroupsFrameComponent } from './pages/admin-page/groups-frame/groups-frame.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'themes', component: ThemesPageComponent },
  {
    path: 'admin', component: AdminPageComponent, children: [
      { path: 'users', component: UsersFrameComponent },
      { path: 'groups', component: GroupsFrameComponent },
      { path: '', redirectTo: '/admin/users', pathMatch: 'full' }
    ]
  },
  {
    path: 'account', component: AccountPageComponent, children: [
      { path: 'profile', component: ProfileFrameComponent },
      { path: '', redirectTo: '/account/profile', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RuckenRoutingModule { }
