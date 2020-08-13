import { isPlatformBrowser } from '@angular/common';
import { AfterContentInit, Directive, ElementRef, Inject, Input, PLATFORM_ID, Renderer } from '@angular/core';

@Directive({
  selector: '[focused]'
})
export class FocusedDirective implements AfterContentInit {
  @Input()
  focused: boolean | string;

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private _ele: ElementRef,
    private _renderer: Renderer
  ) {}

  ngAfterContentInit() {
    if (isPlatformBrowser(this._platformId)) {
      if (this.focused || this.focused === undefined || this.focused === '') {
        setTimeout(_ => this._renderer.invokeElementMethod(this._ele.nativeElement, 'focus'), 500);
      }
    }
  }
}
