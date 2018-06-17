import {
  ChangeDetectionStrategy, Component,
  ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, isDevMode
} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @ViewChild('languagesDropdown')
  languagesDropdown: ElementRef;
  @Input()
  showLogin: boolean;
  @Input()
  showLogout: boolean;
  @Input()
  title: string;
  @Input()
  set routes(routes: any[]) {
    this.allowedRoutes$.next(routes ? routes.filter(
      (item: any) =>
        item.data && item.data.visible !== false
    ) : []);
    const allowedRoutes = this.allowedRoutes$.getValue().map(
      (item: any) => {
        const newItem = item.data;
        if (item.path) {
          newItem.path = item.path;
        }
        newItem.url = `/${newItem.path}`;
        newItem.redirectTo = item.redirectTo;
        return newItem;
      }
    );
    this.rightRoutes$.next(allowedRoutes.filter(
      (item: any) => item.align !== 'left'
    ));
    this.leftRoutes$.next(allowedRoutes.filter(
      (item: any) => item.align === 'left'
    ));
  }
  @Output()
  login = new EventEmitter();
  @Output()
  logout = new EventEmitter();
  @Input()
  languages: any;
  @Input()
  currentLang: string;
  @Output()
  currentLangChange = new EventEmitter<string>();

  public allowedRoutes$ = new BehaviorSubject([]);
  public rightRoutes$ = new BehaviorSubject([]);
  public leftRoutes$ = new BehaviorSubject([]);

  public isCollapsed = true;
  public langsIsCollapsed = true;

  constructor(
    public router: Router
  ) {
  }
  @HostListener('document:click', ['$event'])
  onMouseClick(ev: MouseEvent) {
    if (!this.languagesDropdown || ev.target !== this.languagesDropdown.nativeElement) {
      this.langsIsCollapsed = true;
    }
  }
  onLoginClick() {
    if (isDevMode() && this.login.observers.length === 0) {
      console.warn('No subscribers found for "login"', this);
    }
    this.login.emit(true);
  }
  onLogoutClick() {
    if (isDevMode() && this.logout.observers.length === 0) {
      console.warn('No subscribers found for "logout"', this);
    }
    this.logout.emit(true);
  }
  changeCurrentLang(value: string) {
    this.currentLang = value;
    this.langsIsCollapsed = true;
    if (isDevMode() && this.currentLangChange.observers.length === 0) {
      console.warn('No subscribers found for "currentLangChange"', this);
    }
    this.currentLangChange.emit(value);
  }
}
