import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  standalone: false,
  // imports: [],
  templateUrl: './searchBox.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  emitValue(value: string ) {
    this.onValue.emit(value);
  }

}
