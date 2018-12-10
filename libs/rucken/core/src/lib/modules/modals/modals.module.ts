import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalsService } from './modals.service';

@NgModule({
  imports: [CommonModule],
  providers: [ModalsService]
})
export class ModalsModule {}
