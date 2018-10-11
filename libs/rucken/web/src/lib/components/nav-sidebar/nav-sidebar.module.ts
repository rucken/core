import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { PipesModule } from '../../pipes/pipes.module';
import { NavSidebarComponent } from './nav-sidebar.component';

@NgModule({
  imports: [CommonModule, TranslateModule.forChild(), NgxPermissionsModule, RouterModule, PipesModule],
  declarations: [NavSidebarComponent],
  exports: [NavSidebarComponent, PipesModule]
})
export class NavSidebarModule {}
