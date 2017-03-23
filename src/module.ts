import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { RuckenComponents } from './components';

@NgModule({
  declarations: [
    RuckenComponents
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot()
  ],
  providers: [],
  exports: [
    TranslateModule
  ]
})
export class RuckenModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: RuckenModule };
  }
}
