import { isPlatformBrowser } from '@angular/common';
import { AfterContentInit, Directive, ElementRef, Inject, Input, PLATFORM_ID, Renderer } from '@angular/core';

@Directive({
  selector: '[focused]'
})
export class FocusedDirective implements AfterContentInit {

  @Input('focused')
  focused: boolean | string;

  constructor(
    private ele: ElementRef,
    private renderer: Renderer,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
  }

  ngAfterContentInit() {
    if (isPlatformBrowser(this._platformId)) {
      if (this.focused || this.focused === undefined || this.focused === '') {
        setTimeout(_ =>
          this.renderer.invokeElementMethod(this.ele.nativeElement, 'focus'),
          500
        );
      }
    }
  }
}
