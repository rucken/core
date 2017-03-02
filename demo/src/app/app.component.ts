import { AppService, AlertModalComponent, AppComponent } from '../../../dist';
import { Component, ViewContainerRef, ComponentFactoryResolver, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  entryComponents: [AlertModalComponent]
})
export class DemoAppComponent extends AppComponent {
  @Input()
  autoLoadLang?: boolean;
  public constructor(
    public viewContainerRef: ViewContainerRef,
    public app: AppService,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService
  ) {
    super(viewContainerRef, app, resolver, translateService);
  }
}
