import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base-component/base-component.component';

@Component({
  selector: 'page-sub-header',
  templateUrl: './page-sub-header.component.html',
  styleUrls: ['./page-sub-header.component.scss']
})

export class PageSubHeaderComponent extends BaseComponent {
  @Input()
  public title: string;
}
