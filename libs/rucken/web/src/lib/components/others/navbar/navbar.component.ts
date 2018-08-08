import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
  isDevMode
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
  showSignIn: boolean;
  @Input()
  showSignOut: boolean;
  @Input()
  title: string;
  @Input()
  set routes(routes: any[]) {
    this.allowedRoutes$.next(
      routes
        ? routes.filter((item: any) => item.data && item.data.visible !== false)
        : []
    );
    const allowedRoutes = this.allowedRoutes$.getValue().map((item: any) => {
      const newItem = item.data;
      if (item.path) {
        newItem.path = item.path;
      }
      newItem.url = `/${newItem.path}`;
      newItem.redirectTo = item.redirectTo;
      return newItem;
    });
    this.rightRoutes$.next(
      allowedRoutes.filter((item: any) => item.align !== 'left')
    );
    this.leftRoutes$.next(
      allowedRoutes.filter((item: any) => item.align === 'left')
    );
  }
  @Output()
  signIn = new EventEmitter();
  @Output()
  signOut = new EventEmitter();
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

  constructor(public router: Router) { }
  @HostListener('document:click', ['$event'])
  onMouseClick(ev: MouseEvent) {
    if (
      !this.languagesDropdown ||
      ev.target !== this.languagesDropdown.nativeElement
    ) {
      this.langsIsCollapsed = true;
    }
  }
  onSignInClick() {
    if (isDevMode() && this.signIn.observers.length === 0) {
      console.warn('No subscribers found for "signIn"', this);
    }
    this.signIn.emit(true);
  }
  onSignOutClick() {
    if (isDevMode() && this.signOut.observers.length === 0) {
      console.warn('No subscribers found for "signOut"', this);
    }
    this.signOut.emit(true);
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
