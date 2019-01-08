import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  isDevMode,
  Output,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { ILanguagesItem, LangService } from '@rucken/core';
import { BindObservable } from 'bind-observable';
import { Observable } from 'rxjs';

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

  @Output()
  signIn = new EventEmitter();
  @Output()
  signOut = new EventEmitter();

  @BindObservable()
  @Input()
  allowedRoutes = [];
  allowedRoutes$: Observable<any[]>;
  @BindObservable()
  @Input()
  rightRoutes = [];
  rightRoutes$: Observable<any[]>;
  @BindObservable()
  @Input()
  leftRoutes = [];
  leftRoutes$: Observable<any[]>;

  languages$: Observable<ILanguagesItem[]>;
  currentLang$: Observable<string>;

  public isCollapsed = true;
  public langsIsCollapsed = true;

  constructor(public router: Router, private _langService: LangService) {
    this.languages$ = this._langService.languages$;
    this.currentLang$ = this._langService.current$;
  }
  setRoutes(routes: any[]) {
    this.allowedRoutes = routes ? routes.filter((item: any) => item.data && item.data.visible !== false) : [];
    const allowedRoutes = this.allowedRoutes.map((item: any) => {
      let newItem = item.data;
      if (newItem.meta) {
        newItem = { ...newItem, ...newItem.meta };
      }
      if (item.path) {
        newItem.path = item.path;
      }
      newItem.url = `/${newItem.path}`;
      newItem.redirectTo = item.redirectTo;
      return newItem;
    });
    this.rightRoutes = allowedRoutes.filter((item: any) => item.align !== 'left');
    this.leftRoutes = allowedRoutes.filter((item: any) => item.align === 'left');
  }
  @HostListener('document:click', ['$event'])
  onMouseClick(ev: MouseEvent) {
    if (!this.languagesDropdown || ev.target !== this.languagesDropdown.nativeElement) {
      this.langsIsCollapsed = true;
    }
  }
  onSignInClick(signInData?: any) {
    if (isDevMode() && this.signIn.observers.length === 0) {
      console.warn('No subscribers found for "signIn"', this);
    }
    this.signIn.emit(signInData);
  }
  onSignOutClick(signOutData?: any) {
    if (isDevMode() && this.signOut.observers.length === 0) {
      console.warn('No subscribers found for "signOut"', this);
    }
    this.signOut.emit(signOutData);
  }
  changeCurrentLang(value: string) {
    this._langService.setCurrent(value);
    this.langsIsCollapsed = true;
  }
}
