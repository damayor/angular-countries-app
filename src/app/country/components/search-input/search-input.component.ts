import { Component, input, output } from '@angular/core';

@Component({
  selector: 'search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  placeholder = input('Buscar');
  value = output<string>();



  // onSearch(value: string) {
  //   console.log({value});
  //   this.value.emit(value)

  // }

}
