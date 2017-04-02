import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { RuckenComponents } from './components';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    RuckenComponents
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    TextMaskModule,
    HttpModule,
    Ng2BootstrapModule,
    Ng2AutoCompleteModule,
    TranslateModule.forRoot()
  ],
  providers: [],
  exports: [
    RuckenComponents
  ]
})
export class RuckenModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: RuckenModule };
  }
}
