import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(false);
  }

  private highlight(on: Boolean) {
    if (on) {
      this.el.nativeElement.style.textShadow = '1px 1px 1px #CCC';
    } else {
      this.el.nativeElement.style.textShadow = 'none';
    }
  }

}
