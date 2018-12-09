import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTranslatePipe } from './custom-translate.pipe';
import { PermPipe } from './perm.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { UserPermPipe } from './user-perm.pipe';

@NgModule({
  imports: [CommonModule, TranslateModule.forChild()],
  declarations: [CustomTranslatePipe, SafeHtmlPipe, PermPipe, UserPermPipe],
  exports: [CustomTranslatePipe, SafeHtmlPipe, PermPipe, UserPermPipe],
  providers: [CustomTranslatePipe, SafeHtmlPipe, PermPipe, UserPermPipe]
})
export class PipesModule {}
