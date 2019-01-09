import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@rucken/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    CollapseModule.forRoot(),
    NgxPermissionsModule,
    RouterModule,
    PipesModule
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent, PipesModule]
})
export class NavbarModule {}
