import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
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
    Ng2BootstrapModule,
    TranslateModule.forRoot()
  ],
  providers: []
})
export class RuckenModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: RuckenModule};
  }
}
