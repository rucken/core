import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavSidebarComponent } from '@rucken/web';
import { ENTITIES_PAGE_CHILDREN_ROUTES } from './entities-page.children-routes';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
@Component({
  selector: 'entities-page',
  templateUrl: './entities-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesPageComponent implements OnInit {
  @ViewChild('sidebar')
  sidebar: NavSidebarComponent;
  constructor(private _activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    this.sidebar.setRoutes(ENTITIES_PAGE_CHILDREN_ROUTES);
  }
}
