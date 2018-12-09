import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@rucken/core';
import { NgxRepositoryModule } from 'ngx-repository';

@NgModule({
  imports: [CommonModule, PipesModule, NgxRepositoryModule.forRoot(), TranslateModule.forChild()],
  exports: [CommonModule, PipesModule, NgxRepositoryModule, TranslateModule]
})
export class SharedModule {}
