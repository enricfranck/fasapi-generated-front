import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appUppercaseFirstLetter]',
  standalone: true, // Mark the directive as standalone
})
export class UppercaseFirstLetterDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value;
    if (value.length > 0) {
      input.value = value.charAt(0).toUpperCase() + value.slice(1);
    }
  }

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    if (value.length > 0) {
      input.value = value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
}
