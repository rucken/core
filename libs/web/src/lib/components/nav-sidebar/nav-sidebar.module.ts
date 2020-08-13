import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@rucken/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NavSidebarComponent } from './nav-sidebar.component';

@NgModule({
  imports: [CommonModule, TranslateModule.forChild(), NgxPermissionsModule, RouterModule, PipesModule],
  declarations: [NavSidebarComponent],
  exports: [NavSidebarComponent, PipesModule]
})
export class NavSidebarModule {}
